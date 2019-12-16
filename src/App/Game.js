
import {checkAroundDetail, inc, echo} from '../core/checkAroundDetail';
import {getRandomDetails} from '../core/getRandomDetails';
import autoBind from 'auto-bind';

class Game {
  constructor({world, speed, actions}) {
    this.updateGame({world, speed, actions});
    autoBind(this);
  }

  updateGame({world, speed, actions}) {
    this.world = world;
    this.speed = speed;
    this.actions = actions;
  }

  initNextStep() {
    this.nextStep = {
      nextDetail: true,
      moveDown: null,
      gameOver: false,
    };
  }

  updateNextStep(newNextStep) {
    this.nextStep = Object.assign(this.nextStep, newNextStep);
  }

  scanWord() {
    this.initNextStep();

    this.world.forEach(this.scanRow);

    this.makeStepWhenWordScanned();
  }

  transformDetail() {
    if (this.nextStep.moveDown) {
      this.actions.downBlock();
    } else {
      this.actions.transformBlock({from: 2, to: 1});
    }
  }

  makeStepWhenWordScanned() {
    this.transformDetail();
    this.addNextDetail();

    if (this.nextStep.gameOver) {
      this.handleOverGame();
    };
  }

  startGame() {
    if (this.currentGame) {
      return;
    }

    this.currentGame = setInterval(this.scanWord, this.speed);
  }

  stopGame() {
    if (!this.currentGame) {
      return;
    }

    clearInterval(this.currentGame);
    this.currentGame = null;
  }

  scanRow(row, y) {
    this.updateNextStep({
      y: y,
      completeRow: true,
    });

    row.get('blocks').forEach(this.scanBlock);

    this.makeStepWhenRowScanned();
  }

  makeStepWhenRowScanned() {
    if (this.nextStep.completeRow) {
      this.actions.completeRow(this.nextStep.y);
    };
  }

  checkBlockShouldMove() {
    const {value, moveDown} = this.nextStep;

    return value === 2 && moveDown !== false;
  }

  scanMoveDown() {
    const {x, y} = this.nextStep;

    if (this.checkBlockShouldMove()) {
      this.updateNextStep({
        moveDown: checkAroundDetail({worldMap: this.world, x, y, fx: echo, fy: inc}),
      });
    }
  }

  checkBlockIsEmpty() {
    const {value} = this.nextStep;
    return value !== 1;
  }

  scanCompleteRow() {
    if (this.checkBlockIsEmpty()) {
      this.updateNextStep({completeRow: false});
    }
  }

  checkBlockIsOverlaped() {
    const {value, y} = this.nextStep;
    return value === 1 && y < 4;
  }

  scanGameOver() {
    if (this.checkBlockIsOverlaped()) {
      this.updateNextStep({gameOver: true});
    }
  }

  checkBlockIsPartOfNextDetail() {
    const {nextDetail, value} = this.nextStep;
    return nextDetail && value === 2;
  }

  scanNextDetail() {
    if (this.checkBlockIsPartOfNextDetail()) {
      this.updateNextStep({nextDetail: false});
    }
  }

  scanBlock(block, x) {
    this.updateNextStep({
      value: block.get('value'),
      x,
    });

    this.scanNextDetail();
    this.scanGameOver();
    this.scanCompleteRow();
    this.scanMoveDown();
  }

  addNextDetail() {
    if (this.nextStep.nextDetail) {
      this.actions.nextDetail(getRandomDetails());
    };
  }


  moveDown = (eventType) => {
    this.actions.adjustMovementSpeed(eventType);
    this.game.stopGame();
    this.game.startGame();
  }
}

export default Game;

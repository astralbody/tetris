const fillWorld = (world, nextValue) => world.map((row) => row.set(
    'blocks',
    row.get('blocks').map((block) => block.set('value', nextValue))
));

export default fillWorld;

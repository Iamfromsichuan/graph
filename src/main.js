export const say = () => {
    import(/* webpackChunkName: 'back', webpackPrefetch: true */'./ah').then(res => {
        console.log('helo');
    })
}
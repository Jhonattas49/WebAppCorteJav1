window.addEventListener('resize', function () {
    DotNet.invokeMethodAsync('MudBlazor.Client', 'OnScreenResize', {
        width: window.innerWidth,
        height: window.innerHeight
    });
});
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.less';
// @ts-ignore
// import {start, registerApplication} from '/Users/zhiwei.zheng/Desktop/personalprojects/single-spa/src/single-spa.js'
import {
    start,
    registerApplication
} from '/Users/zhiwei.zheng/Desktop/personalprojects/single-spa/lib/esm/single-spa.dev.js'

function createScript(url: any) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;

        const first = document.getElementsByTagName('script')[0];
        // @ts-ignore
        first.parentNode.insertBefore(script, first);
    })
}

async function createCss(url: any) {
    const res = await fetch(url);
    const cssText = await res.text();
    const style = document.createElement('style')
    style.innerHTML = cssText;
    document.body.appendChild(style);
}

async function loadApp(urls: any[], name: string, csslist?: string | any[]) {
    // await Promise.all(urls.map(async url => await createScript(url)))
    // urls.forEach(url => {
    //     await createScript(url)
    //
    // })
    await createScript(urls[0])
    urls[1] && await createScript(urls[1])

    if (csslist && csslist.length) {
        await createCss(csslist[0]);
    }
    // 取消loading
    // @ts-ignore
    return window[name]
}


// @ts-ignore
registerApplication(
    {
        name: 'react16',
        app: (p) => {
            console.log(p)
            return loadApp([
                'http://localhost:9003/react16.js'
            ], 'react16', [
                'http://localhost:9003/path.css'
            ])
        },
        activeWhen: (location: { pathname: string; }) => location.pathname.startsWith('/react16'),
        customProps: {},
    },
)
// @ts-ignore
registerApplication(
    {
        name: 'vue2',
        app: () => {
            return loadApp([
                'http://localhost:9004/static/js/chunk-vendors.js',
                'http://localhost:9004/static/js/app.js'
            ], 'vue2')
        },
        activeWhen: (location: { pathname: string; }) => location.pathname.startsWith('/vue2'),
        customProps: {},
    },
)
// console.log(start)
start()
const Root = () => {
    return (
        <div className={'rootWrapper'} id={'rootWrapper'}>
        </div>
    );
};
// registerApplication()

const render = () => {
    ReactDOM.render(<Root/>, document.getElementById('root'));
}
render()

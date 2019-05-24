let enterAnimate = [
    {
        name: '从上落下',
        label: 'bounceInDown'
    },
    {
        name: '从下弹起',
        label: 'bounceInUp'
    },
    {
        name: '从小变大',
        label: 'bounceIn'
    },
    {
        name: '渐隐渐现',
        label: 'fadeIn'
    },
    {
        name:'依次放大',
        label:'zoomIn'
    }
    
];

let enterIn = [
    {
        name:'隐藏出现',
        label:'1'
    },
    {
        name:'从上面放入',
        label:'2'
    }
];
let rightAnimate = [
    {
        name: '星星四射',
        label: 'star'
    },
    {
        name: '右下角对勾',
        label: 'rightBottom'
    },
    {
        name: '中间大对勾',
        label: 'center'
    },
    {
        name: '正确选项消失',
        label: 'none'
    },
    {
        name: '正确答案放大移到中间',
        label: 'scaleMove'
    }
];
let wrongAnimate = [
    {
        name: '左右晃动',
        label: 'leftAndRight'
    },
    {
        name: '上下晃动',
        label: 'upAndDown'
    }
    // {
    //     name: '红框闪烁',
    //     label: 'redFlicker'
    // }
];
let mouseEnterAnimate = [
    {
        name: 'Q弹',
        label: 'bomb'
    },
    {
        name: '放大',
        label: 'default'
    }
];
let outAnimate = [
    {
        name: '错误答案消失',
        label: 'none'
    },
    {
        name: '错误答案保留',
        label: 'default'
    },
    {
        name: '错误答案翻卡',
        label: 'turn'
    }
];
export {
    enterAnimate,
    rightAnimate,
    wrongAnimate,
    mouseEnterAnimate,
    outAnimate,
    enterIn
}
// poem
var words=[
    '伤心桥下春波绿',
    '曾是惊鸿照影来',
    '当年明月在',
    '曾照彩云归',
    '归去来兮',
    '真堪偕隐',
    '画船听雨眠',
    '愿为江水',
    '与君重逢',
    '一日不见兮',
    '思之若狂',
    '好想回到那个夏天',
    '趴在桌子上偷偷看你',
    '往后朝夕皆与笪鸣璨共赴',
    '你曾是我灰色人生中的一道彩虹',
    '柳絮空缱绻',
    '南风知不知',
    '我见青山多妩媚',
    '料青山见我也应如是',
    '取次花丛懒回顾',
    '半缘修道半缘君',
    '三笑徒然当一痴',
    '人生若只如初见',
    '我余光中都是你',
    '人生自是有情痴',
    '此恨不关风与月',
    '此生共白头',
    '春蚕到死丝方尽',
    '蜡炬成灰泪始干',
    '今夜何夕',
    '见此良人',
    '愿我如星君如月',
    '夜夜流光相皎洁',
    '情不所起',
    '一往而深',
    '玲珑骰子安红豆',
    '入骨相思知不知',
    '多情只有春庭月',
    '尤为离人照落花',
    '若有知音见采',
    '不辞唱遍阳春',
    '休言半纸无多重',
    '万斛离愁尽耐担',
    '夜月一帘幽梦',
    '和光同尘',
    '杳霭流玉',
    '月落星沉',
    '霞姿月韵',
    '喜上眉梢',
    '醉后不知天在水',
    '满船星梦压星河',
    '落花人独立',
    '微雨燕双飞',
    '掬水月在手',
    '弄花香满衣',
    '夜深忽梦少年事',
    '唯梦闲人不梦君',
    '垆边人似月',
    '皓腕凝霜雪',
    '众里嫣然通一顾',
    '人间颜色如尘土',
    '若非群玉山头见',
    '会向瑶台月下逢',
    '沉鱼落雁鸟惊喧',
    '羞花闭月花愁颤',
    '解释春风无限恨',
    '沉香亭北倚阑干'
];
function randomNum(min,max){
    var num = (Math.random()*(max-min+1)+min).toFixed(2);
    return num;
}
function init(){
    let container = document.querySelector('.container');
    let f = document.createDocumentFragment();
    // 手机端适配：屏幕宽度小于768px时，随机抽取部分诗句，避免太挤
    let displayWords = words;
    if (window.innerWidth < 768) {
        let shuffled = words.slice().sort(() => Math.random() - 0.5);
        displayWords = shuffled.slice(0, 12);
    }
    // 手机端横向散布更广，允许超出屏幕两侧
    var isMobile = window.innerWidth < 768;
    var mlMin = isMobile ? 20 : 6;
    var mlMax = isMobile ? 40 : 35;
    displayWords.forEach(w=>{
    let word_box = document.createElement('div');
    let word = document.createElement('div');
        word.innerText = w;
        word.classList.add('word');
        word.style.color = '#BAABDA';
        word.style.fontFamily = 'ShouXie';
        word.style.fontSize = '20px'
        word_box.classList.add('word-box');
        word_box.style.setProperty("--margin-top",randomNum(-40,20)+'vh');
        word_box.style.setProperty("--margin-left",randomNum(mlMin,mlMax)+'vw');
        word_box.style.setProperty("--animation-duration",randomNum(8,20)+'s');
        word_box.style.setProperty("--animation-delay",randomNum(-20,0)+'s');
        
        word_box.appendChild(word);
        f.appendChild(word_box);


    })
    container.appendChild(f);

    // 景深效果：读取CSS动画的真实进度来控制opacity和blur
    // 延迟一帧确保动画已挂载
    requestAnimationFrame(function() { startDepthEffect(); });
}

function startDepthEffect() {
    var items = [];
    document.querySelectorAll('.word-box').forEach(function(box) {
        var wordEl = box.querySelector('.word');
        var dur = parseFloat(box.style.getPropertyValue('--animation-duration')) * 1000 || 10000;
        items.push({ word: wordEl, box: box, dur: dur });
    });

    function update() {
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            // 通过Web Animations API读取CSS动画的真实currentTime
            var anims = it.box.getAnimations();
            if (!anims.length) continue;
            var ct = anims[0].currentTime;
            if (ct === null || ct === undefined) continue;
            // currentTime(ms) 对 duration(ms) 取模 → 当前周期进度
            var progress = (ct % it.dur) / it.dur;
            var rad = progress * 2 * Math.PI;
            var cosVal = Math.cos(rad);
            // 正面半圈(cos>=0): 始终最清晰
            // 背面半圈(cos<0): 从清晰→模糊→清晰, 180°时最模糊
            var facing = cosVal >= 0 ? 1 : (1 + cosVal);
            it.word.style.opacity = (0.6 + facing * 0.4).toFixed(2);
            it.word.style.filter = 'blur(' + ((1 - facing) * 1).toFixed(1) + 'px)';
        }
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

window.addEventListener('load',init);

 

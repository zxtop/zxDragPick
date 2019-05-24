import {Application,Container,Graphics,Sprite,Point} from 'pixi.js';
import { getAnimation, getSound, load, createSprite,  getTexture} from '../loader';

import {TweenLite,TimeLine,TweenMax} from 'gsap';
import {AnswerInfo} from 'xes-answer';
import {RenderPageByIndex} from 'xes-tem-render';
import Animate from 'xes-animate';

class Actuator {
    constructor() {
        this.stemArr = [];   //答案存放
        this.optionArr = []; //选框存放
        this.pixiStage = null;
        this.currentTarget = null;
        this.stemCurrentTarget = null;
        this.num = 0;
        this.complete = true;
        this.comCotainer = null

        this.cursor = null;
        this.t = null;

        this.isTurn = false;
        this.compulate_num = 0;
        this.isOnce = true;
        this.isTime = false;
    }

    exec(){
        console.log("= 开始执行逻辑 =");
        let _that = this;
        this.initGame(store.state.pageNumber);
        this.cursor = getAnimation(question.sources[store.state.pageNumber].tipContent.animate.animate_name);
        this.cursor.state.setAnimation(1,'animation',true);
        this.cursor.alpha = 0;
        this.pixiStage.addChild(this.cursor);

        //小手指引
        if(question.sources[store.state.pageNumber].tipAnimate && question.sources[store.state.pageNumber].auto == '1'){
            this.t = setTimeout(()=>{
                this.cursor.x = this.stemArr[0].x;
                this.cursor.y = this.stemArr[0].y;
                this.cursor.scale.set(question.sources[store.state.pageNumber].tipContent.animate.scale,question.sources[store.state.pageNumber].tipContent.animate.scale)
                this.cursor.alpha = 1;
            },10000)
        }else if(question.sources[store.state.pageNumber].tipAnimate && question.sources[store.state.pageNumber].auto == '2'){
            this.t = setTimeout(()=>{
                this.cursor.x = this.optionArr[0].x;
                this.cursor.y = this.optionArr[0].y;
                this.cursor.scale.set(question.sources[store.state.pageNumber].tipContent.animate.scale,question.sources[store.state.pageNumber].tipContent.animate.scale)
                this.cursor.alpha = 1;
                this.isTime = true;
            },10000)
        }

        stage.on('pointerup',this.leaveMoveTarget.bind(this));

    }

    initGame(pageNum){ //初始化页面数据
        console.log("第"+pageNum+'页')
        let _that = this;
        this.pixiStage = stage.getChildByName('GAME').getChildByName('GAME'+pageNum);
        RenderPageByIndex(pageNum);
        

        this.comCotainer = new Container();

        this.pixiStage.addChild(this.comCotainer);
        this.num = 0;
        this.complete = true;

        this.optionArr = [];
        this.stemArr = [];
        let componentMap = this.pixiStage.getChildByName('componentContainer');
        componentMap.alpha = 0;
        
        let option = question.sources[pageNum].option;  
        let stem = question.sources[pageNum].linkStem;
        

        stem.forEach((item,index)=>{ //答案图片
            let optionSprite = new PIXI.Sprite.fromImage(res[item.image.name].url);
            optionSprite.interactive = true;
            optionSprite.width = parseFloat(item.image.width);
            optionSprite.height = parseFloat(item.image.height);
            optionSprite.x = parseFloat(item.image.x)+parseFloat(item.image.width/2);
            optionSprite.y = parseFloat(item.image.y)+parseFloat(item.image.height/2);

            optionSprite.startWidth = parseFloat(item.image.width);
            optionSprite.startHeight = parseFloat(item.image.height);
            optionSprite.startX = parseFloat(item.image.x)+parseFloat(item.image.width/2);
            optionSprite.startY = parseFloat(item.image.y)+parseFloat(item.image.height/2);
            optionSprite.name = item.image.name;

            optionSprite.anchor.set(.5,.5);
            optionSprite.key = item.key;
            optionSprite.status = true;
            if(question.sources[pageNum].optionAn !== ''){
                new Animate(optionSprite,{
                    "type":question.sources[pageNum].optionAn,
                    "delay":Math.random()*.3
                });
            }
            this.comCotainer.addChild(optionSprite);
            this.stemArr.push(optionSprite);
        })

        option.forEach((item,index)=>{ //选框图片
            console.log(item.image.name)
            let stemSprite = new PIXI.Sprite.fromImage(res[item.image.name].url);
            stemSprite.unable = PIXI.Texture.fromImage(item.image.name_unable.name);
            stemSprite.able = PIXI.Texture.fromImage(item.image.name);
            stemSprite.key = item.key;
            stemSprite.width = parseFloat(item.image.width);
            stemSprite.height = parseFloat(item.image.height);
            stemSprite.x = parseFloat(item.image.x)+parseFloat(item.image.width/2);
            stemSprite.y = parseFloat(item.image.y)+parseFloat(item.image.height/2);
            stemSprite.anchor.set(.5,.5);
            stemSprite.texture = stemSprite.unable;
            stemSprite.ids = index;
            stemSprite.status = false;
            this.comCotainer.addChild(stemSprite);
            this.optionArr.push(stemSprite);
        })
        //console.log(this.comCotainer);
        console.log(this.optionArr)
        
        
        if(question.sources[store.state.pageNumber].auto == '1'){
           this.optionArr[0].texture = this.optionArr[0].able;
           this.stemArr.map((item,index)=>{
               item.on('pointerover',function(e){
                   _that.overAndScale(e);
               });
               item.on('pointerout',function(e){
                   _that.outAndScale(e);
               });
               item.on('pointerdown',function(e){
                   _that.getCurrentTarget(e);
               });
           })
        }else{
           this.optionArr.map((item,index)=>{
               item.interactive = true;
               item.on('pointerdown',function(e){
                   console.log("zzzzz")
                   _that.getTargetStem(e);
               })
           })
           
        }

    }

    overAndScale(e){
        let target = e.currentTarget;
        TweenLite.to(target,.4,{width:1.05*target.width,height:1.05*target.height});
    }

    outAndScale(e){
        let target = e.currentTarget;
        TweenLite.to(target,.4,{width:target.startWidth,height:target.startHeight});
    }
    getTargetStem(e){
        let _that = this;
        console.log("手动点击");
        
        if(question.sources[store.state.pageNumber].tipAnimate && _that.isTime){
            console.log("没操作......",_that.t)
            this.cursor.alpha = 0;
            clearTimeout(this.t);
            this.t = null;
        };
        

        _that.optionArr.map((item,index)=>{
            item.texture = item.unable;
            item.status = false;
        });

        _that.stemCurrentTarget = e.currentTarget;
        _that.stemCurrentTarget.texture = _that.stemCurrentTarget.able;
        _that.stemCurrentTarget.status = true;
        _that.isTurn = true;
        _that.num = _that.stemCurrentTarget.ids;
        if(_that.isTurn){
            
            if(question.sources[store.state.pageNumber].tipAnimate && _that.isOnce){
                this.cursor.x = this.stemArr[0].x;
                this.cursor.y = this.stemArr[0].y;
                this.cursor.scale.set(question.sources[store.state.pageNumber].tipContent.animate.scale,question.sources[store.state.pageNumber].tipContent.animate.scale)
                this.cursor.alpha = 1;
                _that.isOnce = false;
            }

            if(question.sources[store.state.pageNumber].tipAnimate && !_that.isTime){
                this.cursor.alpha = 0;
                _that.isTime = true;
            }

            this.stemArr.map((item,index)=>{
                item.on('pointerover',function(e){
                    _that.overAndScale(e);
                });
                item.on('pointerout',function(e){
                    _that.outAndScale(e);
                });
                item.on('pointerdown',function(e){
                    _that.getObject(e);
                });
            })
        }
    }
    
    getObject(e){
        let _that = this;
        if(this.complete && this.currentTarget==null){
            this.currentTarget = e.currentTarget;
            console.log("点击",this.optionArr[this.num].key,this.currentTarget.key);

            if(this.currentTarget.status && this.complete){
                
                if(question.sources[store.state.pageNumber].tipAnimate){
                    this.cursor.alpha = 0;
                }
                if(this.optionArr[this.num].key.value.indexOf(_that.currentTarget.key)!==-1 && this.optionArr[this.num].status){ //正确
                    //随机播放正确音频
                    let rightAudio = question.sources[store.state.pageNumber].rightAudio;
                    let random = parseInt(Math.random()*rightAudio.length);
                    rightAudio[random].audio?res[rightAudio[random].audio].sound.play():"";
    
                    this.complete = false;
                    if(question.sources[store.state.pageNumber].switchStatus){ //隐藏答案
                        _that.currentTarget.status = false;

                        if(question.sources[store.state.pageNumber].letAn == '2'){
                            TweenLite.to(
                                this.currentTarget,.5,
                                {x:this.optionArr[this.num].x,y:this.optionArr[this.num].y,onStart:function(){
                                    _that.optionArr[_that.num].alpha = 0;
                                },onComplete:function(){
                                    _that.complete = true;
                                    _that.optionArr[_that.num].status = false;
                                    if(_that.compulate_num == _that.optionArr.length-1){
                                        console.log("跳转下一题");
                                        //初始化答案并提交
                                        if(store.state.pageNumber < question.sources.length-1){
                                            //暂停音频和动画
                                            _that.pixiStage.children[1].stemAudioStr?_that.pixiStage.children[1].stemAudioStr.pause():"";
                                            window.stemSoundAn?window.stemSoundAn.timeScale = 0:"";
        
                                            let answer = new AnswerInfo();
                                            answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                            store.dispatch('pushToPostArr', answer);
                                            store.state.pageNumber++;
                                            setTimeout(() => {
                                                _that.initGame(store.state.pageNumber)
                                            }, 500);
                                        }else{
                                            let answer = new AnswerInfo();
                                            answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                            store.dispatch('pushToPostArr', answer);
                                            store.dispatch('postAnswer');
                                        }
                                        
                                    }else{
        
                                        _that.compulate_num ++;
                                    }
                                }}
                            )

                        }else{
                            _that.currentTarget.x = _that.optionArr[_that.num].x;
                            _that.currentTarget.y = _that.optionArr[_that.num].y;
                            _that.optionArr[_that.num].alpha = 0;

                            _that.complete = true;
                            _that.optionArr[_that.num].status = false;
                            if(_that.compulate_num == _that.optionArr.length-1){
                                console.log("跳转下一题");
                                //初始化答案并提交
                                if(store.state.pageNumber < question.sources.length-1){
                                    //暂停音频和动画
                                    _that.pixiStage.children[1].stemAudioStr?_that.pixiStage.children[1].stemAudioStr.pause():"";
                                    window.stemSoundAn?window.stemSoundAn.timeScale = 0:"";

                                    let answer = new AnswerInfo();
                                    answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                    store.dispatch('pushToPostArr', answer);
                                    store.state.pageNumber++;
                                    setTimeout(() => {
                                        _that.initGame(store.state.pageNumber)
                                    }, 500);
                                }else{
                                    let answer = new AnswerInfo();
                                    answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                    store.dispatch('pushToPostArr', answer);
                                    store.dispatch('postAnswer');
                                }
                                
                            }else{

                                _that.compulate_num ++;
                            }

                        }


                    }else{
                        _that.currentTarget.status = false;

                        if(question.sources[store.state.pageNumber].letAn == '2'){
                            TweenLite.to(_that.currentTarget,.5,{
                                x:_that.optionArr[_that.num].x,
                                y:_that.optionArr[_that.num].y,
                                onStart:function(){
                                    _that.optionArr[_that.num].alpha = 0;
                                    let stemSprite = new PIXI.Sprite.fromImage(res[_that.currentTarget.name].url);
                                    stemSprite.interactive = true;
                                    stemSprite.anchor.set(.5,.5);
                                    stemSprite.x = _that.currentTarget.startX;
                                    stemSprite.y = _that.currentTarget.startY;
                                    stemSprite.width = _that.currentTarget.startWidth;
                                    stemSprite.height = _that.currentTarget.startHeight;
                                    stemSprite.startWidth = _that.currentTarget.startWidth;
                                    stemSprite.startHeight = _that.currentTarget.startHeight;
                                    stemSprite.startX = _that.currentTarget.startX;
                                    stemSprite.startY = _that.currentTarget.startY;
                                    stemSprite.key = _that.currentTarget.key;
                                    stemSprite.name = _that.currentTarget.name;
                                    stemSprite.status = true;
                                    _that.comCotainer.addChild(stemSprite);
                                    stemSprite.on('pointerover',function(e){_that.overAndScale(e);});
                                    stemSprite.on('pointerout',function(e){_that.outAndScale(e)});
                                    stemSprite.on('pointerdown',function(e){_that.getObject(e)})
                                    _that.comCotainer.setChildIndex(_that.currentTarget,_that.comCotainer.children.length-1);
    
                                },onComplete:function(){
                                    _that.optionArr[_that.num].status = false;
                                    if(_that.compulate_num == _that.optionArr.length-1){
                                        console.log("跳转下一题");
                                        //初始化答案并提交
                                        if(store.state.pageNumber<question.sources.length-1){
                                            //暂停音频和动画
                                            _that.pixiStage.children[1].stemAudioStr?_that.pixiStage.children[1].stemAudioStr.pause():"";
                                            window.stemSoundAn?window.stemSoundAn.timeScale = 0:"";
        
                                            let answer = new AnswerInfo();
                                            answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                            store.dispatch('pushToPostArr', answer);
                                            store.state.pageNumber++;
                                            setTimeout(() => {
                                                _that.initGame(store.state.pageNumber)
                                            }, 500);
                                        }else{
                                            let answer = new AnswerInfo();
                                            answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                            store.dispatch('pushToPostArr', answer);
                                            store.dispatch('postAnswer');
                                        }
                                    }else{
                                        _that.compulate_num ++;
                                        _that.complete = true;
    
                                    }
                                }
                            })

                        }else{
                            _that.currentTarget.x = _that.optionArr[_that.num].x;
                            _that.currentTarget.y = _that.optionArr[_that.num].y;
                            
                            _that.optionArr[_that.num].alpha = 0;
                            let stemSprite = new PIXI.Sprite.fromImage(res[_that.currentTarget.name].url);
                            stemSprite.interactive = true;
                            stemSprite.anchor.set(.5,.5);
                            stemSprite.x = _that.currentTarget.startX;
                            stemSprite.y = _that.currentTarget.startY;
                            stemSprite.width = _that.currentTarget.startWidth;
                            stemSprite.height = _that.currentTarget.startHeight;
                            stemSprite.startWidth = _that.currentTarget.startWidth;
                            stemSprite.startHeight = _that.currentTarget.startHeight;
                            stemSprite.startX = _that.currentTarget.startX;
                            stemSprite.startY = _that.currentTarget.startY;
                            stemSprite.key = _that.currentTarget.key;
                            stemSprite.name = _that.currentTarget.name;
                            stemSprite.status = true;
                            _that.comCotainer.addChild(stemSprite);
                            stemSprite.on('pointerover',function(e){_that.overAndScale(e);});
                            stemSprite.on('pointerout',function(e){_that.outAndScale(e)});
                            stemSprite.on('pointerdown',function(e){_that.getObject(e)})
                            _that.comCotainer.setChildIndex(_that.currentTarget,_that.comCotainer.children.length-1);

                            
                            _that.optionArr[_that.num].status = false;
                            if(_that.compulate_num == _that.optionArr.length-1){
                                console.log("跳转下一题");
                                //初始化答案并提交
                                if(store.state.pageNumber<question.sources.length-1){
                                    //暂停音频和动画
                                    _that.pixiStage.children[1].stemAudioStr?_that.pixiStage.children[1].stemAudioStr.pause():"";
                                    window.stemSoundAn?window.stemSoundAn.timeScale = 0:"";

                                    let answer = new AnswerInfo();
                                    answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                    store.dispatch('pushToPostArr', answer);
                                    store.state.pageNumber++;
                                    setTimeout(() => {
                                        _that.initGame(store.state.pageNumber)
                                    }, 500);
                                }else{
                                    let answer = new AnswerInfo();
                                    answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                    store.dispatch('pushToPostArr', answer);
                                    store.dispatch('postAnswer');
                                }
                            }else{
                                _that.compulate_num ++;
                                _that.complete = true;

                            }
                        }

                    }
    
                }else{
                    //随机播放错误音频
                    let wrongAudio = question.sources[store.state.pageNumber].wrongAudio;
                    let random = parseInt(Math.random()*wrongAudio.length);
                    
                    wrongAudio[random].audio?res[wrongAudio[random].audio].sound.play():"";
                    
                    new Animate(_that.currentTarget,{
                        "type":question.sources[store.state.pageNumber].wrongAn,
                        "delay":Math.random()*.3
                    });
                }
            }
            
        }
    }


    getCurrentTarget(e){
        let _that = this;
        if(this.complete && this.currentTarget==null){
            this.currentTarget = e.currentTarget;
            console.log("点击",this.optionArr[this.num].key,this.currentTarget.key);
            if(this.currentTarget.status && this.complete){
                if(question.sources[store.state.pageNumber].tipAnimate){
                    this.cursor.alpha = 0;
                    clearTimeout(this.t);
                    this.t = null;
                }
                
                if(this.optionArr[this.num].key.value.indexOf(_that.currentTarget.key)!==-1){ //正确
                    //随机播放正确音频
                    let rightAudio = question.sources[store.state.pageNumber].rightAudio;
                    let random = parseInt(Math.random()*rightAudio.length);
                    rightAudio[random].audio?res[rightAudio[random].audio].sound.play():"";
    
                    this.complete = false;
                    if(question.sources[store.state.pageNumber].switchStatus){ //隐藏答案
                        _that.currentTarget.status = false;

                        if(question.sources[store.state.pageNumber].letAn == '2'){ //从上面放入
                            TweenLite.to(
                                this.currentTarget,.5,
                                {x:this.optionArr[this.num].x,y:this.optionArr[this.num].y,onStart:function(){
                                    _that.optionArr[_that.num].alpha = 0;
                                },onComplete:function(){
                                    _that.complete = true;
    
                                    if(_that.num == _that.optionArr.length-1){
                                        console.log("跳转下一题");
                                        //初始化答案并提交
                                        if(store.state.pageNumber < question.sources.length-1){
                                            //暂停音频和动画
                                            _that.pixiStage.children[1].stemAudioStr?_that.pixiStage.children[1].stemAudioStr.pause():"";
                                            window.stemSoundAn?window.stemSoundAn.timeScale = 0:"";
        
                                            let answer = new AnswerInfo();
                                            answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                            store.dispatch('pushToPostArr', answer);
                                            store.state.pageNumber++;
                                            setTimeout(() => {
                                                _that.initGame(store.state.pageNumber)
                                            }, 500);
                                        }else{
                                            let answer = new AnswerInfo();
                                            answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                            store.dispatch('pushToPostArr', answer);
                                            store.dispatch('postAnswer');
                                        }
                                        
                                    }else{
        
                                        _that.num ++;
                                        _that.optionArr[_that.num].texture = _that.optionArr[_that.num].able;
                                    }
                                }}
                            )
                        }else{ //隐藏出现
                            _that.currentTarget.x = _that.optionArr[_that.num].x;
                            _that.currentTarget.y = _that.optionArr[_that.num].y;
                            _that.optionArr[_that.num].alpha = 0;
                            _that.complete = true;

                            if(_that.num == _that.optionArr.length-1){
                                console.log("跳转下一题");
                                //初始化答案并提交
                                if(store.state.pageNumber < question.sources.length-1){
                                    //暂停音频和动画
                                    _that.pixiStage.children[1].stemAudioStr?_that.pixiStage.children[1].stemAudioStr.pause():"";
                                    window.stemSoundAn?window.stemSoundAn.timeScale = 0:"";

                                    let answer = new AnswerInfo();
                                    answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                    store.dispatch('pushToPostArr', answer);
                                    store.state.pageNumber++;
                                    setTimeout(() => {
                                        _that.initGame(store.state.pageNumber)
                                    }, 500);
                                }else{
                                    let answer = new AnswerInfo();
                                    answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                    store.dispatch('pushToPostArr', answer);
                                    store.dispatch('postAnswer');
                                }
                                
                            }else{

                                _that.num ++;
                                _that.optionArr[_that.num].texture = _that.optionArr[_that.num].able;
                            }
                        }

                    }else{
                        _that.currentTarget.status = false;

                        if(question.sources[store.state.pageNumber].letAn == '2'){
                            
                            TweenLite.to(_that.currentTarget,.5,{
                                x:_that.optionArr[_that.num].x,
                                y:_that.optionArr[_that.num].y,
                                onStart:function(){
                                    _that.optionArr[_that.num].alpha = 0;
                                    let stemSprite = new PIXI.Sprite.fromImage(res[_that.currentTarget.name].url);
                                    stemSprite.interactive = true;
                                    stemSprite.anchor.set(.5,.5);
                                    stemSprite.x = _that.currentTarget.startX;
                                    stemSprite.y = _that.currentTarget.startY;
                                    stemSprite.width = _that.currentTarget.startWidth;
                                    stemSprite.height = _that.currentTarget.startHeight;
                                    stemSprite.startWidth = _that.currentTarget.startWidth;
                                    stemSprite.startHeight = _that.currentTarget.startHeight;
                                    stemSprite.startX = _that.currentTarget.startX;
                                    stemSprite.startY = _that.currentTarget.startY;
                                    stemSprite.key = _that.currentTarget.key;
                                    stemSprite.name = _that.currentTarget.name;
                                    stemSprite.status = true;
                                    _that.comCotainer.addChild(stemSprite);
                                    stemSprite.on('pointerover',function(e){_that.overAndScale(e);});
                                    stemSprite.on('pointerout',function(e){_that.outAndScale(e)});
                                    stemSprite.on('pointerdown',function(e){_that.getCurrentTarget(e)})
                                    _that.comCotainer.setChildIndex(_that.currentTarget,_that.comCotainer.children.length-1);
    
                                },onComplete:function(){
                                    if(_that.num == _that.optionArr.length-1){
                                        console.log("跳转下一题");
                                        //初始化答案并提交
                                        if(store.state.pageNumber<question.sources.length-1){
                                            //暂停音频和动画
                                            _that.pixiStage.children[1].stemAudioStr?_that.pixiStage.children[1].stemAudioStr.pause():"";
                                            window.stemSoundAn?window.stemSoundAn.timeScale = 0:"";
        
                                            let answer = new AnswerInfo();
                                            answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                            store.dispatch('pushToPostArr', answer);
                                            store.state.pageNumber++;
                                            setTimeout(() => {
                                                _that.initGame(store.state.pageNumber)
                                            }, 500);
                                        }else{
                                            let answer = new AnswerInfo();
                                            answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                            store.dispatch('pushToPostArr', answer);
                                            store.dispatch('postAnswer');
                                        }
                                    }else{
                                        _that.num ++;
                                        _that.optionArr[_that.num].texture = _that.optionArr[_that.num].able;
                                        _that.complete = true;
    
                                    }
                                }
                            })
                        }else{
                            _that.currentTarget.x = _that.optionArr[_that.num].x;
                            _that.currentTarget.y = _that.optionArr[_that.num].y;

                            _that.optionArr[_that.num].alpha = 0;
                            let stemSprite = new PIXI.Sprite.fromImage(res[_that.currentTarget.name].url);
                            stemSprite.interactive = true;
                            stemSprite.anchor.set(.5,.5);
                            stemSprite.x = _that.currentTarget.startX;
                            stemSprite.y = _that.currentTarget.startY;
                            stemSprite.width = _that.currentTarget.startWidth;
                            stemSprite.height = _that.currentTarget.startHeight;
                            stemSprite.startWidth = _that.currentTarget.startWidth;
                            stemSprite.startHeight = _that.currentTarget.startHeight;
                            stemSprite.startX = _that.currentTarget.startX;
                            stemSprite.startY = _that.currentTarget.startY;
                            stemSprite.key = _that.currentTarget.key;
                            stemSprite.name = _that.currentTarget.name;
                            stemSprite.status = true;
                            _that.comCotainer.addChild(stemSprite);
                            stemSprite.on('pointerover',function(e){_that.overAndScale(e);});
                            stemSprite.on('pointerout',function(e){_that.outAndScale(e)});
                            stemSprite.on('pointerdown',function(e){_that.getCurrentTarget(e)})
                            _that.comCotainer.setChildIndex(_that.currentTarget,_that.comCotainer.children.length-1);

                            if(_that.num == _that.optionArr.length-1){
                                console.log("跳转下一题");
                                //初始化答案并提交
                                if(store.state.pageNumber<question.sources.length-1){
                                    //暂停音频和动画
                                    _that.pixiStage.children[1].stemAudioStr?_that.pixiStage.children[1].stemAudioStr.pause():"";
                                    window.stemSoundAn?window.stemSoundAn.timeScale = 0:"";

                                    let answer = new AnswerInfo();
                                    answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                    store.dispatch('pushToPostArr', answer);
                                    store.state.pageNumber++;
                                    setTimeout(() => {
                                        _that.initGame(store.state.pageNumber)
                                    }, 500);
                                }else{
                                    let answer = new AnswerInfo();
                                    answer.init({type: 0, useranswer: '', answer: '', id: store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                    store.dispatch('pushToPostArr', answer);
                                    store.dispatch('postAnswer');
                                }
                            }else{
                                _that.num ++;
                                _that.optionArr[_that.num].texture = _that.optionArr[_that.num].able;
                                _that.complete = true;

                            }

                        }


                    }
    
                }else{
                    //随机播放错误音频
                    let wrongAudio = question.sources[store.state.pageNumber].wrongAudio;
                    let random = parseInt(Math.random()*wrongAudio.length);
                    wrongAudio[random].audio?res[wrongAudio[random].audio].sound.play():"";
                    
                    new Animate(_that.currentTarget,{
                        "type":question.sources[store.state.pageNumber].wrongAn,
                        "delay":Math.random()*.3
                    });
                }
            }
            
        }

    }

    leaveMoveTarget(e){
        if(this.currentTarget){
            this.currentTarget = null;
        }
    }

}
export {Actuator};
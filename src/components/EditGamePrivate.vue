<template>
    <div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.option1?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option1')" ref="option1Title"></i>
            <span @click="tabShow(index,'option1')">
            答案图片
            </span>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.option1">
            <div class="option-animate">
                <div class="option-animate-title" style="float:left">
                    隐藏答案
                </div>
                <div>
                    <div class="edit-switch" style="float:right">
                        <el-switch style=""
                                v-model="gameData[index].switchStatus"
                                active-color="#77DC04"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                </div>
            </div>


            <div class="option-animate">
                <div class="option-animate-title" style="float:left">
                    长时间无应答动画
                </div>
                <div>
                    <div class="edit-switch" style="float:right">
                        <el-switch style=""
                                v-model="gameData[index].tipAnimate"
                                active-color="#77DC04"
                                inactive-color="#ff4949"
                                @change="pickAn"
                                >
                        </el-switch>
                    </div>
                </div>

                <div style="clear:both"></div>

                <div class="upload">
                    <span class="file-title">动画文件：</span>
                    <div class="animate-box">
                        <span v-text="gameData[index].tipContent.animate.animate_name"></span>
                    </div>
                    <div class="upload-btn" style="float:left;">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation(index,'tipcontent',$event)">
                        </div>

                    </div>
                </div>


                <el-input placeholder="请输入其scale" v-model="gameData[index].tipContent.animate.scale" size="mini" @input="setElementStatus(index,'tipcontent','scale',$event,'','image','','animate')">
                    <template slot="prepend">scale :</template>
                </el-input>
            </div>



            <div class="optionItem">
                <div v-for="(linkStem,ids) in gameData[index].linkStem" v-bind:key="ids">

                    <div class="dragTitle title">
                        <span style="color:#fff;margin-top:20px">元素 {{ids+1}}</span>
                        <i @click="changeOptionArr('del',ids)" class="game-title-icon el-icon-delete" style="color:#fff"></i>
                        <i @click="changeOptionArr('copy',ids)" class="game-title-icon el-icon-tickets" style="color:#fff"></i>
                        <i @click="changeOptionArr('add',ids)" class="game-title-icon el-icon-plus" style="color:#fff"></i>
                    </div>


                    <div class="pointItem">
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[linkStem.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage(index,'linkStem',ids ,$event)">
                                </div>
                            </div>
                        </div>
                        <div class="lockStatus">
                            <el-input placeholder="请输入其宽度" v-model="linkStem.image.width" size="mini" @input="setElementStatus(index,'linkStem'+ids,'width',$event,linkStem.image.ratio,'image',ids,'linkStem')">
                                <template slot="prepend">W :</template>
                            </el-input>
                            <span class="lock_block" :lockRadio="linkStem.image.ratio"><img :src="linkStem.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusData(linkStem,$event)"></span>
                            <el-input placeholder="请输入其高度" v-model="linkStem.image.height" size="mini" @input="setElementStatus(index,'linkStem'+ids,'height',$event,linkStem.image.ratio,'image',ids,'linkStem')">
                                <template slot="prepend">H :</template>
                            </el-input>
                        </div>
                        <el-input placeholder="请输入其起始x" v-model="linkStem.image.x" size="mini" @input="setElementStatus(index,'linkStem'+ids,'x',$event,linkStem.image.ratio,'image',ids,'linkStem')">
                            <template slot="prepend">X :</template>
                        </el-input>
                        <el-input placeholder="请输入其起始y" v-model="linkStem.image.y" size="mini" @input="setElementStatus(index,'linkStem'+ids,'y',$event,linkStem.image.ratio,'image',ids,'linkStem')">
                            <template slot="prepend">Y :</template>
                        </el-input>
                    </div>


                </div>
            </div>
            
        </div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option2?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option2')" ref="option2Title"></i>
            <span @click="tabShow(index,'option2')">
            答案图片入场动画
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option2">
            <div class="option-animate">
                <div class="option-animate-radio" >
                    <el-radio v-model="gameData[index].optionAn" 
                    :label="item2.label" 
                    :key="item2.label" 
                    v-for="(item2,index2) in enterAnimate"
                    >{{item2.name}}</el-radio>
                </div>
            </div>
        </div>



        <div class="game-title">
            <i :class="tabShowStatus[index].child.option6?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option6')" ref="option6Title"></i>
            <span @click="tabShow(index,'option6')">
            答案图片放入效果
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option6">
            <div class="edit-radio-title">
                <el-radio-group v-model="gameData[index].letAn">
                    <el-radio  label="1">隐藏出现</el-radio>
                    <el-radio  label="2">从上面放入</el-radio>
                </el-radio-group>
            </div>

        </div>



        <div class="game-title">
            <i :class="tabShowStatus[index].child.option3?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option3')" ref="option3Title"></i>
            <span @click="tabShow(index,'option3')">
            选框图片
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option3">
            <div class="dragItem">

                <div class="edit-radio-title">
                    <el-radio-group v-model="gameData[index].auto">
                        <el-radio  label="1">默认选中</el-radio>
                        <el-radio  label="2">手动选中</el-radio>
                    </el-radio-group>
                </div>

                <div v-for="(option,ids) in gameData[index].option" v-bind:key="ids">
                    <div class="dragTitle title">
                        <span>选择框 {{ids+1}}</span>
                        <i @click="changeStemArr('del',ids)" class="game-title-icon el-icon-delete"></i>
                        <i @click="changeStemArr('copy',ids)" class="game-title-icon el-icon-tickets"></i>
                        <i @click="changeStemArr('add',ids)" class="game-title-icon el-icon-plus"></i>
                    </div>
                    <div class="pointItem">
                        <div class="choiceItem" style="width:100%;padding-left:10px;margin-top:15px;float:left">
                            <span style="color:#f5f5f5;padding-right:5px">对应答案:</span>
                            <el-checkbox-group v-model="option.key.value" @change="addOrDelete">
                                <el-checkbox 
                                v-for="(linkStem,idx) in gameData[index].linkStem" v-bind:key="idx"
                                :label="linkStem.key" 
                                size="small" 
                                style="font-style:normal;color:#f5f5f5;padding-right:10px">元素{{idx+1}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    <div class="choiceItem" style="width:100%;margin-top:15px;float:left">
                            <span style="color:#f5f5f5;padding:5px;background:#555;width:100%;display:block">选中选择框图片:</span>
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[option.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage(index,'option',ids ,$event)">
                                </div>
                            </div>
                        </div>

                        <div class="choiceItem" style="width:100%;margin-top:15px;float:left">
                            <span style="color:#f5f5f5;padding:5px;background:#555;width:100%;display:block">未选中选择框图片:</span>
                        </div>

                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[option.image.name_unable.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadChangeImage(index,'option',ids ,$event)">
                                </div>
                            </div>
                        </div>

                        <div class="lockStatus">
                            <el-input placeholder="请输入其宽度" v-model="option.image.width" size="mini" @input="setElementStatus(index,'option'+ids,'width',$event,option.image.ratio,'image',ids,'option')">
                                <template slot="prepend">W :</template>
                            </el-input>
                            <span class="lock_block" :lockRadio="option.image.ratio"><img :src="option.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusData(option,$event)"></span>
                            <el-input placeholder="请输入其高度" v-model="option.image.height" size="mini" @input="setElementStatus(index,'option'+ids,'height',$event,option.image.ratio,'image',ids,'option')">
                                <template slot="prepend">H :</template>
                            </el-input>
                        </div>

                        <el-input placeholder="请输入其起始x" v-model="option.image.x" size="mini" @input="setElementStatus(index,'option'+ids,'x',$event,option.image.ratio,'image',ids,'option')">
                            <template slot="prepend">X :</template>
                        </el-input>
                        <el-input placeholder="请输入其起始y" v-model="option.image.y" size="mini" @input="setElementStatus(index,'option'+ids,'y',$event,option.image.ratio,'image',ids,'option')">
                            <template slot="prepend">Y :</template>
                        </el-input>

                    </div>

                </div>
            </div>

        </div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option4?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option4')" ref="option4Title"></i>
            <span @click="tabShow(index,'option4')">
            错误效果
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option4">
            <div class="option-animate">
                <div class="option-animate-radio" >
                    <el-radio v-model="gameData[index].wrongAn" 
                    :label="item2.label" 
                    :key="item2.label" 
                    v-for="(item2,index2) in wrongAnimate">{{item2.name}}
                    </el-radio>
                </div>
            </div>
        </div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option5?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option5')" ref="option5Title"></i>
            <span @click="tabShow(index,'option5')">
            正误音效
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option5">
            <div class="soundList">
                <div v-for="(rightAudio,ids) in gameData[index].rightAudio">
                    <div class="rightAudioTitle title" v-if="ids == 0">
                        <span>正确音效{{ids+1}}</span>
                        <i @click="changeRightAudioArr('add',ids)" class="game-title-icon el-icon-plus" style="margin-right:30px"></i>
                    </div>
                    <div class="pointItem">
                        <div class="upload">
                            <span class="file-title">音频文件：</span>
                            <div class="animate-box" style="width:30%;">
                                <span v-text="rightAudio.audio"></span>
                            </div>
                            <div class="upload-btn" style="float:left;">
                                <div class="upload-btn-file">
                                    <span>更改文件</span>
                                    <input type="file" @change="uploadAudio(index,'rightAudio',ids,$event)">
                                </div>
                            </div>
                            <div style="float:left;color:#fff;">
                                <i @click="changeRightAudioArr('del',ids)" class="game-title-icon el-icon-delete" style="margin:6px 4px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(wrongAudio,ids) in gameData[index].wrongAudio">
                    <div class="wrongAudioTitle title" v-if="ids == 0">
                        <span>错误音效{{ids+1}}</span>
                        <i @click="changeWrongAudioArr('add',ids)" class="game-title-icon el-icon-plus" style="margin-right:30px"></i>
                    </div>
                    <div class="pointItem">
                        <div class="upload">
                            <span class="file-title">音频文件：</span>
                            <div class="animate-box" style="width:30%;">
                                <span v-text="wrongAudio.audio"></span>
                            </div>
                            <div class="upload-btn" style="float:left;">
                                <div class="upload-btn-file">
                                    <span>更改文件</span>
                                    <input type="file" @change="uploadAudio(index,'wrongAudio',ids,$event)">
                                </div>
                            </div>
                            <div style="float:left;color:#fff;">
                                <i @click="changeWrongAudioArr('del',ids)" class="game-title-icon el-icon-delete" style="margin:6px 4px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {CopyAndRender,DeleteEleByName,UploadAndRenderEle,RenderElementByIndex} from 'xes-tem-render'
    import {enterAnimate,rightAnimate,wrongAnimate,mouseEnterAnimate,outAnimate,enterIn} from './libs/publicData'

    export default {
        name: "EditGamePrivate",
        data() {
            return {
                enterAnimate:enterAnimate,
                wrongAnimate:wrongAnimate,
                enterIn:enterIn,
                lockImg:this.resourceData['image_lock_on'],
                unLockImg:this.resourceData['image_lock_off'],
                checkbox:false,
                radio:1,
                switchStatus:false,
                audio_name:'',
                image:{
                    "show": true,
                    "x": 0,
                    "y": 0,
                    "lock":false,
                    "width":0,
                    "height":0,
                    "name": "",
                    "ratio":0
                },
                sprite:{
                    "show": false,
                    "x": "500",
                    "y": "0",
                    "name": "",
                    "scale": "1",
                    "loop": false
                },
                animate:{
                    "show": false,
                    "x": "100",
                    "y": "100",
                    "name": "",
                    "scale": "3",
                    "loop": true
                }
            }
        },
        props: [
            "allData",
            "gameData",
            "resourceData",
            "item",
            "index",
            "tabShowStatus"
        ],
        mounted() {
        },
        methods: {
            pickAn(e){
                console.log(e);
                let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                let component = componentContainer.getChildByName('tipcontent');
                if(!e){
                    if(component){
                        componentContainer.removeChild(component);
                    }
                    this.gameData[this.index].tipContent.animate.animate_name = '';
                    this.gameData[this.index].tipContent.animate.scale = '';
                }else{
                    if(component){
                        component.alpha = 1;
                    }
                }
            },
            changeWrongAudioArr(type, ids) {
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].wrongAudio[ids]));
                    resetArr(arr);
                    this.gameData[this.index].wrongAudio.push(arr);
                }
                else if (type === 'copy') {
                    this.gameData[this.index].wrongAudio.push(JSON.parse(JSON.stringify(this.gameData[this.index].wrongAudio[ids])));
                }
                else if (type === 'del') {
                    if(this.gameData[this.index].wrongAudio.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData[this.index].wrongAudio.splice(ids, 1);
                            // this.tabShowStatus.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },
            changeRightAudioArr(type, ids) {
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].rightAudio[ids]));
                    resetArr(arr);
                    this.gameData[this.index].rightAudio.push(arr);
                }
                else if (type === 'copy') {
                    this.gameData[this.index].rightAudio.push(JSON.parse(JSON.stringify(this.gameData[this.index].rightAudio[ids])));
                    // this.tabShowStatus.push({
                    //     show: false,
                    //     child: JSON.parse(JSON.stringify(this.tabShowLists))
                    // })
                }
                else if (type === 'del') {
                    if(this.gameData[this.index].rightAudio.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData[this.index].rightAudio.splice(ids, 1);
                            // this.tabShowStatus.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },
            uploadChangeImage(index, name,ids, e) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0]
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    /*
                    * res.fieldName 图片原始name
                    * res.path 图片路径
                    * res.resourceName 资源name  需要更改gameData相应字段
                    * res.size 图片大小
                    * res.headers http headers
                    * */
                    this.gameData[index][name][ids].image.name_unable.name = res.resourceName;
             
                    this.gameData[index][name][ids].image.name_unable.width = res.width;
                    this.gameData[index][name][ids].image.name_unable.height = res.height;
                    this.updateResourceData();
                })
            },
            addOrDelete(value){
                // linkStem.key.indexOf(key) == -1?linkStem.key.push(key):linkStem.key.splice(linkStem.key.indexOf(key),1);
                // console.log("dd");
                // console.log(option.key)
               let checkedCount = value.length;
               console.log(value)
                
                
                
            },
            changeStemArr(type, ids) {
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].option[ids]));
                    resetArr(arr);
                    arr.image.width = 0;
                    arr.image.height = 0;
                    arr.image.x = 0;
                    arr.image.y = 0;
                    arr.image.lockImg = 'image_lock_off';
                    arr.key.value = [0];
                    console.log(arr)
                    // arr.zIndex = this.gameData[this.index].option.length+1;
                    
                    this.gameData[this.index].option.push(arr);
                }
                else if (type === 'copy') {
                    let data = JSON.parse(JSON.stringify(this.gameData[this.index].option[ids]));
                    data.image.radio = 0;
                    data.image.lockImg = 'image_lock_off';

                    this.gameData[this.index].option.push(data);
                    this.gameData[this.index].option.forEach((item,idx)=>{
                        item.image.componentName = 'option'+idx;
                    })
                    
                    // this.allData.sources[this.index].option.forEach(item=>{
                    //     // item.key.indexOf(this.gameData[this.index].linkStem[ids].key)!=-1?item.key.push(this.gameData[this.index].linkStem[index-1].key):"";
                    //     console.log(item.key.value)
                    // })
                    // console.log(this.gameData[this.index].option);
                    RenderElementByIndex(this.index,this.allData);
                }
                else if (type === 'del') {
                    if(this.gameData[this.index].option.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            // this.gameData[this.index].option.forEach(item=>{
                            //     // item.key.indexOf(this.gameData[this.index].linkStem[ids].key)!=-1?item.key.splice(item.key.indexOf(this.gameData[this.index].linkStem[ids].key),1):"";
                            // })


                            //删除当前元素
                            this.gameData[this.index].option.splice(ids, 1);
                            this.gameData[this.index].option.forEach((item,idx)=>{
                                item.image.componentName = 'option'+idx
                            })
                            RenderElementByIndex(this.index,this.allData);
                            //重新赋值key
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },
            lockStatusData(item,e){
                //判断当前状态是否锁定
                if(item.image.name){
                    if(item.image.width&&item.image.height){
                        if(e.currentTarget.getAttribute('data-lock')==='true'){
                            //锁定状态解除锁定，还原各变量
                            e.currentTarget.setAttribute('data-lock','false');
                            item.image.ratio = 0;
                            item.image.lock = false;
                        }else{
                            //未锁定添加锁定，添加变量
                            e.currentTarget.setAttribute('data-lock','true');
                            item.image.lock = true;
                            item.image.ratio = parseFloat(item.image.width)/parseFloat(item.image.height);
                        }
                    }else{
                        this.$message.error('绑定对象的宽高都不可为空');
                        return
                    }
                }else{
                    this.$message({
                        type: 'warning',
                        message: '舞台未绑定元素!'
                    });
                }
            },
            changeOptionArr(type, ids) {
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].linkStem[ids]));
                    resetArr(arr);
                    arr.image.width = 0;
                    arr.image.height = 0;
                    arr.image.x = 0;
                    arr.image.y = 0;
                    arr.image.lockImg = 'image_lock_off';
                    arr.key = this.gameData[this.index].linkStem.length;
                    this.gameData[this.index].linkStem.push(arr);
                }
                else if (type === 'copy') {

                    let data = JSON.parse(JSON.stringify(this.gameData[this.index].linkStem[ids]));
                    console.log(data);
                    data.image.radio = 0;
                    data.image.lockImg = 'image_lock_off';
                    data.key = this.gameData[this.index].linkStem.length;
                    this.gameData[this.index].linkStem.push(data);
                    this.gameData[this.index].linkStem.forEach((item,idx)=>{
                        item.image.componentName = 'linkStem'+idx;
                    })
                    RenderElementByIndex(this.index,this.allData);
               }
                else if (type === 'del') {
                    if(this.gameData[this.index].linkStem.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData[this.index].linkStem.splice(ids, 1);
                            this.gameData[this.index].linkStem.forEach((item,idx)=>{
                                item.image.componentName = 'linkStem'+idx
                            })
                            RenderElementByIndex(this.index,this.allData);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch((e) => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },

            verifyNumber(number){
                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number)
                };
                let reg = /^\d*\.+$/g;
                if(isNaN(number)){
                    number = 0;
                }
                if(parseFloat(number)>=0){
                    if(isFloat(parseFloat(number))){
                        number = parseFloat(number.split('.')[0]+'.'+number.split('.')[1].substr(0,1));
                    }else{
                        if(reg.test(number)){
                            number = parseFloat(number)+'.';
                        }else{
                            number = number?parseFloat(number):0;
                        }
                    }
                }else{
                    number = 0;
                }
                return number
            },
            setElementStatus(index,name,attr,e,ratio,type,ids,option){
                let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                let data = null;
                if(option == 'linkStem'){
                    data = this.item.linkStem[ids][type];
                }else if(option == 'option'){
                    data = this.item.option[ids][type];
                }else if(option == 'animate'){
                    data = this.item.tipContent.animate
                }
                // console.log("ddddd",this.item.content.option1.blank_drag)
                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        component[attr].set(data[attr]);
                    }else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return false;
                        }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                            console.log(data)
                            if(data.lock){
                                // console.log(parseFloat(e)/ratio,ratio)
                                if(e){
                                    data['height'] = (e/ratio).toFixed(0);
                                    component['height'] = data['height']
                                }
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                if(e){
                                    data['width'] = (e*ratio).toFixed(0);
                                    component['width'] = data['width']
                                }
                            }
                        }
                    }
                }
            },






            setImageLock(){
                this.image.lock = !this.image.lock;
                if(!this.image.height||!this.image.width){
                    this.$message({
                        message: 'X或Y为0或为空 无法计算比例',
                        type: 'warning'
                    });
                    return;
                }
                if(this.image.lock){
                    this.image.ratio = this.image.width/this.image.height;
                }
            },
            setAttr(name,attr){
                if(this.image.ratio>0&&(attr === 'width'||attr === 'height')&&this.image.lock){
                    if(attr === 'width'){
                        console.log(this.image.width,this.image.ratio);
                        this.image.height = this.image.width/this.image.ratio;
                    }else if(attr === 'height'){
                        this.image.width = this.image.height*this.image.ratio;
                    }
                }
            },
            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                let nameTab = this.tabShowStatus[index].child[name];
                if (nameTab) {
                    this.tabShowStatus[index].child[name] = false;
                    title.className = 'el-icon-arrow-right'
                } else {
                    Object.keys(this.tabShowStatus[index].child).forEach((item, index1) => {
                        this.tabShowStatus[index].child[item] = false
                    })
                    this.tabShowStatus[index].child[name] = true;
                    title.className = 'el-icon-arrow-down'
                }
            },
            verifyAnimationFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json", "atlas"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            verifySpriteFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            uploadImage(index, name, ids, e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['jpg', 'png'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0],
                        render:true
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    if(name === 'option'){
                        this.gameData[this.index].option[ids].image.name = res.resourceName;
                        this.gameData[this.index].option[ids].image.componentName = name+ids;
                        this.gameData[this.index].option[ids].image.width = res.width;
                        this.gameData[this.index].option[ids].image.height = res.height;
                        this.gameData[this.index].option[ids].image.x?"":this.gameData[this.index].option[ids].image.x = 0;
                        this.gameData[this.index].option[ids].image.y?"":this.gameData[this.index].option[ids].image.y = 0;
                        // console.log(this.gameData[this.index].option[ids].image.name)
                        UploadAndRenderEle(this.index,name+ids,res,this.allData);
                    }else if(name === 'linkStem'){
                        console.log(res.resourceName)
                        this.gameData[this.index].linkStem[ids].image.name = res.resourceName;
                        this.gameData[this.index].linkStem[ids].image.componentName = name+ids;
                        this.gameData[this.index].linkStem[ids].image.width = res.width;
                        this.gameData[this.index].linkStem[ids].image.height = res.height;
                        this.gameData[this.index].linkStem[ids].image.x?"":this.gameData[this.index].linkStem[ids].image.x = 0;
                        this.gameData[this.index].linkStem[ids].image.y?"":this.gameData[this.index].linkStem[ids].image.y = 0;
                        UploadAndRenderEle(this.index,name+ids,res,this.allData);
                    }

                    
                    this.updateResourceData();
                    e.target.value = '';
                })
            },
            uploadAnimation(index,name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 3){
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                if(!this.verifyAnimationFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let type = 'Animate';
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {

                    this.gameData[this.index].tipContent.animate.animate_name = res.resourceName;
                    this.gameData[this.index].tipContent.animate.componentName = name;
                    this.gameData[this.index].tipContent.animate.x?"":this.gameData[this.index].tipContent.animate.x = 0;
                    this.gameData[this.index].tipContent.animate.y?"":this.gameData[this.index].tipContent.animate.y = 0;
                    UploadAndRenderEle(this.index,name,res,this.allData);
                    e.target.value = '';
                    this.updateResourceData();
                })
            },
            uploadSprite(name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 2) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                if(!this.verifySpriteFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['sprite' + (index + 1)] = item;
                });
                console.log(object);
                this.$http.post('/uploadingSprite', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.sprite.name = res.resourceName;
                    e.target.value = '';
                })
            },
            uploadAudio(index,name,ids,e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['mp3', 'wav'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name][ids].audio = res.resourceName;

                })
            },
            updateResourceData() {
                
                this.$emit('updateResourceData')
            },
        }
    }
</script>
<style scoped lang="scss">

    .title{
        width:100%;
        height: 40px;
        line-height: 40px;
        background: #555555;
        margin-top: 15px;
        padding-left: 15px;
        color: #fff;
        padding-right: 8px;
        float:left;
    }
    .lockStatus{
        .el-input{
            width: 110px;
        }
        .lock_block{
            display: inline-block;
            width: 42px;
            height: 28px;
            float: left;
            margin-top: 15px;
            margin-left: 15px;

            img{
                cursor:pointer;
            }
        }
    }
    .option-item {
        border-top:1px solid #ccc;
        overflow: hidden;
        width: 100%;
        margin-top: 15px;
        float: left;
        &:nth-of-type(1){
            border: none;
        }
    }
    .game-icon {
        height: 40px;
        line-height: 40px;
        color: #fff;
        float: left;
        width: 100%;
    }
    .audio-title{
        margin-top: 15px;
        margin-bottom: 0;
        float: left;
        padding: 0 5px;
    }
    .option-animate{
        color: #eee;
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
        overflow: hidden;
        .option-animate-radio{
            >label{
                margin: 5px 0;
            }
        }
        .option-checkbox{
            overflow: hidden;
            &>*{
                overflow: hidden;
            }
        }
        .option-animate-title{
            margin-top: 15px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-animate-radio{
            margin: 10px 0 0 0;
            >label{
                width: 50%;
            }
        }
    }
    .option-audio{
        color: #eee;
        .option-audio-title{
            margin-bottom: 10px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-audio-inner{
            padding-left: 15px;
        }
    }
    .styleTitle{
        float: left;
        width: 100%;
        color: #fff;
        padding:0 10px;
    }
    .feedbackArea{
        clear: both;
        overflow: hidden;
    }
    .feedbackArea .edit-animate-checkbox{
        float: left;
        margin: 15px 10px 0 0;
        width: 45%;
    }
    .feedbackArea .edit-animate-checkbox span{
        color: #f5f5f5;
    }
    .feedbackArea .edit-animate-checkbox div{
        width:50%;
    }
</style>
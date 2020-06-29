// 功能：创建一个轮播图
// 参数：父dom对象，图片地址数组
// 样式参考
// *{
//     margin: 0;
//     padding: 0;
// }
// ul,li{
//     list-style: none;
// }
// .slider-box{
//     width: 700px;
//     height: 400px;
//     margin: 0 auto;
//     position: relative;
//     overflow: hidden;
// }
// .slider-box .slider-item-box{
//     position: absolute;
    
//     width: 10000px;
//     height: 400px;

// }
// .slider-box .slider-item-box .slider-item{
//     height: 100%;
//     width: 700px;
//     float: left;
// }
// .slider-box .slider-item-box .slider-item img{
//     height: 100%;
//     width: 100%;
//     display: block;
// }
// .slider-control{
//     position: absolute;
//     width: 700px;
//     display: flex;
//     justify-content:space-between;
//     top:50%;
//     margin-top: -25px;
// }
// .slider-box .slider-control span{
//     text-align: center;
//     line-height: 50px;
//     font-size: 40px;
//     width: 50px;
//     height: 50px;
//     background: yellow;
// }
// .slider-box .slider-nav{
//     position: absolute;
//     right: 0;
//     bottom: 0;
//     display: flex;
//     padding-right: 5px;
//     opacity: .8;
//     /* background: pink; */
// }
// .slider-box .slider-nav .slider-nav-item{
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//     text-align: center;
//     line-height: 30px;
//     font-size: 24px;
//     margin: 6px 3px;
//     background: white;
// }
// .slider-box .slider-nav .active{
//     background: red;
//     opacity: .8;
// }

class Slider{
    constructor(parents,data){
        this.parents=$(parents)
        this.data=data
        this.sliderBox=null
        this.sliderItemBox=null
        this.sliderControl=null
        this.sliderNav=null
        this.width=null
        this.timer=null
        this.index=0
    }
    init(){//初始化
        this.creatUI()
        this.autoPlayer()
        this.addEventHanderInOut()
        this.prevAndNextControl()
        this.sliderNavControl()
        this.indexAddActive()
    }
    creatUI(){//创建ui界面
        let creatSliderItemBox="<ul class='slider-item-box'>"+this.data.map(item=>
                    `<li class="slider-item">
                        <img src="${item}" >
                    </li>`
        ).join("")+"</ul>"
        let creatControl=`<div class="slider-control">
                            <span class="prev">&lt;</span>
                            <span class="next">&gt;</span>
                        </div>`
        let creatSliderNav="<ul class='slider-nav'>"+this.data.map((item,idx)=>`<li class="slider-nav-item">${idx+1}</li>`).join("")+"</ul>"
        this.sliderBox=$("<div></div>").addClass("slider-box").html(creatSliderItemBox+creatControl+creatSliderNav)
        this.parents.append(this.sliderBox)
        // 选择sliderBox下的子元素
        this.sliderItemBox=this.sliderBox.children("ul:eq(0)")
        this.sliderControl=this.sliderBox.children("div")
        this.sliderNav=this.sliderBox.children("ul:eq(1)")
        this.width=this.sliderBox.width()
    }
    autoPlayer(){//自动播放
        this.timer=setInterval(()=>{
            this.nextImg()
            this.indexAddActive()
        },2000)
    }
    addEventHanderInOut(){// 鼠标进入停止，离开继续
        this.sliderBox.mouseenter(()=>clearInterval(this.timer))
        this.sliderBox.mouseleave(()=>this.autoPlayer())
    }
    prevAndNextControl(){// 控制上一张下一张
        this.sliderControl.children().eq(0).click(()=>{
            this.prevImg()
            this.indexAddActive()
        }
        )
        this.sliderControl.children().eq(1).click(()=>{
            this.nextImg()
            this.indexAddActive()
        }
        )
    }
    sliderNavControl(){
        let self=this
        this.sliderNav.children().click(function(){
            self.index=$(this).index()
            self.indexAddActive()
            self.sliderItemBox.css("left",-(self.index*self.width)+"px")
        })
    }
    indexAddActive(){//根据当前图片下标添加属性active
        this.sliderNav.children().eq(this.index).addClass("active").siblings("li").removeClass("active")
    }
    nextImg(){//下一张图片
        this.index++
        if(this.index==this.data.length)this.index=0;
        this.sliderItemBox.css("left",-(this.index*this.width)+"px")
    }
    prevImg(){//上一张图片
        this.index--
        if(this.index==-1)this.index=this.data.length-1;
        this.sliderItemBox.css("left",-(this.index*this.width)+"px")
    }
}

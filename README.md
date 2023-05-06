# 这是一个非常简单的实现布局的库
# This is a very simple package to implement the layout
## 名称 name

Reading of NB [njuː biː]
This word means very very crazy,very very  amazing and very very  admirable

## 安装 
## install

```shell
    npm i react-nblayout

    yarn add react-nblayout
```
## 导入 
## import

```javascript
import  { NBLayout,col, row } from 'react-nblayout'

```

## 仅使用布局功能
## Only use the layout ability

```javascript
const simpleDemo = () => {
    return NBLayout(
        [
            row([<Ele/>,<Ele/>,<Ele/>,<Ele/>,<Ele/>]),
            col([
                <Ele/>,
                <Ele/>,
                <Ele/>,
                <Ele/>,
                row([<Ele/>,<Ele/>,<Ele/>,col([
                                            <Ele/>,
                                            <Ele/>,
                                          ])
                ])
            ])
        ]
    )
}

```
### 效果
### preview
![预览](https://gitee.com/wdppx/macos/raw/master/src/image/demo.png "预览")

## 进阶使用
## Advanced
```javascript
const Demo = () => {

    return NBLayout(
        [
            row([<Div />, <Div />, <Div />, <Div />, <Div />, <Div />, <Div />, <Div />, <Div />]),
            row([
                col([<Div />, <Div />,]),
                col([<Div />, <Div />,]),
            ]),
            col([
                <Div />,
                row([<Div />, <Div />],{background:"#122b2182"},{background:"#514663",color:"white",flexGrow:0}),
                row([<Div />, <Div />, <Div />],{},{flexGrow:0}),
                row([<Div />, <Div />, <Div />, <Div />]),
                row([<Div />, <Div />, <Div />, <Div />,<Div />])
            ],{background:"black",fontSize:"20px",color:"white"}),
        ],
        {height:"100vh",background:"white"},
    )
}

```
### 效果 preview
![预览](https://gitee.com/wdppx/macos/raw/master/src/image/demo2.png "预览")
```typescript
const boxStyle:React.CSSProperties = {
    position:"relative",
    
}
const itemStyle:React.CSSProperties={
    marginBottom:"2vh",
    background:"white"
}
const mockData = ["nb1","nb2","nb3","nb4","nb5"]
const Demo = () => {
    
    return NBLayout(
        [
            row([
                col(mockData.map(item => <Div>{item}</Div>),{...boxStyle,top:"2vh"},{...itemStyle}),
                col(mockData.map(item => <Div>{item}</Div>),{...boxStyle,top:"6vh"},{...itemStyle}),
                col(mockData.map(item => <Div>{item}</Div>),{...boxStyle,top:"10vh"},{...itemStyle}),
                col(mockData.map(item => <Div>{item}</Div>),{...boxStyle,top:"14vh"},{...itemStyle}),
                col(mockData.map(item => <Div>{item}</Div>),{...boxStyle,top:"18vh"},{...itemStyle})
            ])
            //NBlayout||row||col 接受到的组件数组渲染时会自动填充key 所以不用传key
            /*
            NBlayout||row||col The component array received by col will 
            be automatically filled with keys when rendering, 
            so no key needs to be passed
            */
        ],
        {height:"100vh",background:"black"},"myclass"
    )
}
```
### 效果 preview
![预览](https://gitee.com/wdppx/macos/raw/master/src/image/demo4.png "预览")

## 支持响应式 Responsive


![预览](https://gitee.com/wdppx/macos/raw/master/src/image/demo3.png "预览")




# 文档 document
### NBLayout 参数类型 Parameter Type
```typescript
  NBLayout(NBarr: JSX.Element[], style?: React.CSSProperties | undefined,className?:string): JSX.Element
  
```

## NBlayout 基于flex布局  Based on flex layout
接收3个参数  第2,第3个为可选值

第一个参数是组件列表 只有一层 虽然看上去是多维数组 其实row col两个函数最终返回都都是单个组件

也就是说
 ```typescript
   NBlayout([...arr]) || row([...arr]) || col([...arr])  返回值都是一个React组件
```

Receive the second of three parameters, and the third is an optional value

The first parameter is that the component list has only one layer. 

Although it looks like a multi-dimensional array, 

in fact, both row col functions ultimately return a single component

in other words
```typescript
   NBlayout([...arr]) || row([...arr]) || col([...arr])  =  <ReactComponent/> 

```
这样的设计实际上只是编写代码上有一定的可视化功能 使布局更为直观 方便调整


第二个参数是 整个NbLayout 容器的样式 按照React.CSSProperties 类型提示去写即可 

In fact, such design is just to write code,

which has certain visualization functions to make the layout more intuitive and convenient to adjust

The second parameter is to write the style of the entire NbLayout container according to the React.CSSProperties 
type prompt

需要注意的是 NBlayout row col 接受到的组件数组会自动填充key 所以无论是一个个写 还是使用arr.map 都无需手写key=...

It should be noted that the component array received by NBlayout row col will automatically fill in keys, 
so whether you write one by one or use arr.map, you do not need to write keys=

第三个参数为替换自定义类名 方便自定义样式 和容器内的row col 隔离其他nblayout

The third parameter is to replace the custom class name to facilitate custom style 
and row col in the container to isolate other nblayouts
## row&&col 
``` typescript
    row(arr: JSX.Element[], style?: React.CSSProperties | undefined, itemstyle?: React.CSSProperties | undefined): JSX.Element
    col(arr: JSX.Element[], style?: React.CSSProperties | undefined, itemstyle?: React.CSSProperties | undefined): JSX.Element
```
接收3个参数  前2个 与NBlayout相同 第三个参数为row|col 内的子组件样式 

调用row会将 组件列表用样式类.nb-row的div包括起来 

具体样式如下

The first two parameters are the same as NBlayout. 

The third parameter is the sub component style in row | col

Calling row will include the component list with the div of the style class. nb row

The specific style is as follows

```css
.nb-row {
    width: 100%;
    display: flex ;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-wrap: wrap;
}
```
调用col会将 组件列表用样式类.nb-col的div包括起来 

具体样式如下

Calling col will include the component list with the div of the style class. nb col

The specific style is as follows
```css
.nb-col{
    max-width: 100%;
    display: flex ;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-wrap: wrap;
}
```
如果自定义的组件不希望自动增长 可参照demo中的写法 或者直接在css中增加flex-grow:0;

If you do not want the customized components to grow automatically,

you can refer to the writing method in the demo or directly add flex grow: 0 in the css;

```typescript
    row([<Div />, <Div />, <Div />],{},{flexGrow:0}),
```


## 通过css调整col row 基础样式
如果通过NBlayout组装使用
可使用以下方式的css选择器 修改row 以及col 的基础样式规则 
如果是单独使用 col 或者 row 请找一个最近的父结点类名或id替换 .nb-root
如果NBlayout调用时接收了第三个参数 将.nb-root 替换为你自定义的类名

If used by NBlayout assembly
The basic style rules of row and col can be modified using the css selector in the following ways
If col or row is used alone, please find the nearest parent node class name or id to replace. nb root
If NBlayout receives the third parameter when calling, replace. nb root with your customized class name
```css
.nb-root .nb-row{

}
.nb-root .nb-col{

}
.myclass .nb-row{

}
.myclass .nb-col{
    
}
```

## 自定义组件规范

如果自定义组件使用第三个参数item样式后未生效 请注意是否接收style属性 并赋值给组件内的div
可参考demo中的Div组件

If the custom component does not take effect after using the third parameter item style, please note whether to receive the style attribute and assign it to the div in the component
Refer to the Div component in the demo

```typescript
interface NbDiv{
    style?: React.CSSProperties,
    children?: ReactNode
}
export const Div: React.FC<NbDiv> = ({ style, children }) => {
    return (
        <div style={style}> //自定义组件时 请接收style参数并赋值 style会被 Nblayout 自动传入
        /**
         //When customizing components, please receive the style parameter and assign a value. The style will be automatically imported by Nblayout
         */
            {children}
        </div>
        )
}
```

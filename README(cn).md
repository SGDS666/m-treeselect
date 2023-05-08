<a href="https://github.com/SGDS666/m-treeselect/blob/master/README.md">英文</a>
<a href="https://github.com/SGDS666/m-treeselect/blob/master/README(cn).md">中文</a>

这是一个完全基于mui组件封装的树选择器，没有使用第三方库

具有以下特点

1.完全兼容MUI主题配置

2 高度自定义用法

3 上手容易 0 学习成本

4 一个完全受控的组件（状态必​​须手动控制，但相信我，这已经被优化的很容易了）
(而且这只是一个基础组件 你可以随意进行封装 )

先来看看长什么样子

<img width="859" alt="image" src="https://user-images.githubusercontent.com/86196091/236647319-ed40f1f5-beb4-4d05-b697-204a664cd16c.png">

两侧看起来有点不同，因为左边的组件包含在 MUI 主题中 还自定义了文件夹图标

<img width="479" alt="image" src="https://user-images.githubusercontent.com/86196091/236752033-a4c20319-7da5-4b07-a528-5680fb15592c.png">

首先，相信大家会比较关心数据格式，因为涉及到实际使用体验，我设计了三种数据方案。一种是默认格式，像这样

<img width="422" alt="image" src="https://user-images.githubusercontent.com/86196091/236647435-4e7f32de-e80e-4d0b-90aa-6b98ae4fe26b.png">

ID决定了你实际控制state的key值 组件的最终形式由state中固定的数据和受控的checklist决定 label决定了页面显示的内容 children是否有值决定了是属于目录还是一个选择项目

这是默认格式。什么都不用配置，只要传入符合格式的数据就可以使用了 但是相信实际业务中格式化是个很头疼的问题，所以我也加了一个自定义格式给我们看看下面的数据

<img width="447" alt="image" src="https://user-images.githubusercontent.com/86196091/236647593-76a5348a-e48c-4368-8ebf-0262fd859df4.png">

使组件适应不同的格式是提高效率的最佳方法。通过指定对应的key，开发就可以这样愉快的进行了

<img width="334" alt="image" src="https://user-images.githubusercontent.com/86196091/236752340-a343343c-af1b-4858-a3c3-879919293725.png">

第三种方法是提供一个名为flatDataFormatter的工具，将平面数据转换成组件可以使用的数据格式如下

<img width="631" alt="image" src="https://user-images.githubusercontent.com/86196091/236848790-652b4e7c-c6a5-405a-9c3a-918c0843049d.png">

<img width="1199" alt="image" src="https://user-images.githubusercontent.com/86196091/236849047-c6511900-8278-4f53-a52e-697442a78187.png">

这个格式化函数是组件自带的，相信可以辅助数据处理

这些数据只是组件初始渲染的基础，最痛苦的的是数据的处理,我们可以为组件设置默认选中项，
传入一个checkedDataids数组，数据类型为对应的'id'值，
它是完全受控的。你需要通过onChange获取组件最新的状态更新。检查后的Dataids组件可以正常运行。来看看演示效果

为了演示方便，我加了一个看起来更直观的东西，就是我们维护的state的实际值

<img width="743" alt="image" src="https://user-images.githubusercontent.com/86196091/236752627-a3d6c908-d9c2-4168-a38f-fba194578bc9.png">


![Kapture 2023-05-07 at 05 48 05](https://user-images.githubusercontent.com/86196091/236647964-acd7436f-6dce-4f14-a095-f143b048837b.gif)

就像上面的演示，我们只关心选中项是谁 组件中文件夹的状态会由组件自己维护 OnChange 会传入运行结果，直接更新状态，不用做任何处理

不需要其他任何东西。就这么简单。不要怀疑 如果我必须再说一些东西的话

那就是你不仅可以自定义字段 你还可以像这样使用 labelRender 自定义渲label

<img width="419" alt="image" src="https://user-images.githubusercontent.com/86196091/236752813-a6403f40-e617-40de-bffe-e7dd9093f42c.png">

<img width="459" alt="image" src="https://user-images.githubusercontent.com/86196091/236660027-4ceae507-c580-45e5-a63a-d38df621b6cc.png">

OnChange不仅仅是给你一个选中ID的数组，它只是最简单的快速上手的方法同时，也会传入选中的具体数据列表 
代码做一些改动再来看看，像

<img width="435" alt="image" src="https://user-images.githubusercontent.com/86196091/236753442-7f21231e-04c1-43ef-bba8-646052443d26.png">

现在让我们看看打印的内容

![Kapture 2023-05-08 at 14 57 24](https://user-images.githubusercontent.com/86196091/236755879-c49ac30e-e820-4620-bb46-b7cd2d5ce367.gif)

<img width="685" alt="image" src="https://user-images.githubusercontent.com/86196091/236756000-cf5fe6ee-c6f2-4252-b371-ad6aedf4758d.png">

数据中包含 ID 和 label。如果你进行了自定义，结果就是你自定义的ID或者label 字段

但是这特么的 extra  是什么？

<img width="685" alt="image" src="https://user-images.githubusercontent.com/86196091/236756000-cf5fe6ee-c6f2-4252-b371-ad6aedf4758d.png">

这是一个额外的自定义字段，可能对某些人有用。onChange时，可以获取到相应的内容，这里可以放任意内容

<img width="431" alt="image" src="https://user-images.githubusercontent.com/86196091/236757193-c54bd201-6d0a-48d3-94df-536e5dc6d133.png">

它是可选的

还可以自定义用于展开和收起的图标 选中的图标 选择了一部分的图标 如果你用的是TS开发，可以查看具体的类型 相信不是很复杂
我也贴一下配置类型的截图

<img width="328" alt="image" src="https://user-images.githubusercontent.com/86196091/236648085-8095c975-26e3-4c34-90b3-ad1360dcd6ef.png">

如果您不想选择某个选项或文件夹，
您可以传入 disable 
或许您不希望用户随心所欲的选择所有项目而是让他们仔细选择每一项。
只需要禁用上层目录即可。
如果需要禁用所有项目，
则需要为每个项目添加disable

<img width="767" alt="image" src="https://user-images.githubusercontent.com/86196091/236739548-7d9fdb76-3d39-4f87-b43b-b9bfdfb760ab.png">

![Kapture 2023-05-08 at 13 14 38](https://user-images.githubusercontent.com/86196091/236739716-832bf45b-77cf-4fe4-8d8f-6ddbf88f25a2.gif)

这些是你可以自定义传入的内容，都是可选的

可以传入autoExpand这样选中的item会自动展开

<img width="437" alt="image" src="https://user-images.githubusercontent.com/86196091/236802540-01663e26-1277-40c2-95cc-d8e4b0bb8e4f.png">

![Kapture 2023-05-08 at 18 36 29](https://user-images.githubusercontent.com/86196091/236803055-0f5824d3-3459-4e7c-b569-4f6387818b5d.gif)

当然，就像所有的MUI组件一样，你也可以使用sx来改变组件的整体风格。如果遇到什么问题，欢迎来Github提交Issues 

<a href="https://github.com/SGDS666/m-treeselect">github</a>
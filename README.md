This is a tree selector completely based on mui component encapsulation without using third-party libraries

Has the following characteristics

1.Fully compatible with MUI theme configuration

2 Height Customization Usage

3 Easy to get started 0 Learning costs

4 fully controlled components (state must be manually controlled, but believe me, this has been optimized very easily)

Let's take a look at what it looks like first

<img width="859" alt="image" src="https://user-images.githubusercontent.com/86196091/236647319-ed40f1f5-beb4-4d05-b697-204a664cd16c.png">

The two sides look a bit different because the one on the left is included in the MUI theme and custom folder icons

<img width="479" alt="image" src="https://user-images.githubusercontent.com/86196091/236752033-a4c20319-7da5-4b07-a528-5680fb15592c.png">


First of all, I believe everyone will be more concerned about data format because it involves practical usage experience
I have designed Three data schemes. One is the default format, like this

<img width="422" alt="image" src="https://user-images.githubusercontent.com/86196091/236647435-4e7f32de-e80e-4d0b-90aa-6b98ae4fe26b.png">

The ID determines the key value of your actual control state
The final form of the component is determined by fixed data and controlled checklists in the state
The label determines the content displayed on the page
Whether children have a value determines whether they belong to the directory or a selection item

This is the default format. You don't need to configure anything, just pass in the data that meets the format to use it
But I believe that formatting is a headache in actual business, so I also added a custom format for us to take a look at the following data

<img width="447" alt="image" src="https://user-images.githubusercontent.com/86196091/236647593-76a5348a-e48c-4368-8ebf-0262fd859df4.png">

Adapting components to different formats is the best way to improve efficiency. By specifying the corresponding key, development can proceed happily like this

<img width="334" alt="image" src="https://user-images.githubusercontent.com/86196091/236752340-a343343c-af1b-4858-a3c3-879919293725.png">

The third method is to provide a tool called flatDataFormatter to convert flat data into a data format that components can use
Like below

<img width="631" alt="image" src="https://user-images.githubusercontent.com/86196091/236848790-652b4e7c-c6a5-405a-9c3a-918c0843049d.png">

<img width="1199" alt="image" src="https://user-images.githubusercontent.com/86196091/236849047-c6511900-8278-4f53-a52e-697442a78187.png">




This utility function comes with the component and is believed to assist in data processing



These data are just the foundation for the initial rendering of the component, and the most challenging aspect is obtaining the data
We can set the default selected items for the component and pass in a checkedDataids array
The data type is the corresponding 'id' value, so there is nothing else to note. It is completely controlled. You need to obtain the latest status update of the component through onChange. The checked Dataids component can work successfully. Let's take a look at the demonstration effect

For the convenience of the demonstration, I added something that looks more intuitive, which is the actual value of the state we maintain

<img width="743" alt="image" src="https://user-images.githubusercontent.com/86196091/236752627-a3d6c908-d9c2-4168-a38f-fba194578bc9.png">


![Kapture 2023-05-07 at 05 48 05](https://user-images.githubusercontent.com/86196091/236647964-acd7436f-6dce-4f14-a095-f143b048837b.gif)


As demonstrated, we only care about who the selected project is
The status of the folder will be maintained by the component itself
OnChange will pass in the results of the operation and update the status directly without any processing

Nothing else is needed. It's that simple. Don't doubt it
If I have to say one more thing
That is
you can not only customize fields
You can also customize rendering using labelRender
like this

<img width="419" alt="image" src="https://user-images.githubusercontent.com/86196091/236752813-a6403f40-e617-40de-bffe-e7dd9093f42c.png">

<img width="459" alt="image" src="https://user-images.githubusercontent.com/86196091/236660027-4ceae507-c580-45e5-a63a-d38df621b6cc.png">

OnChange doesn't just give you a Array of selected IDs, it's just the simplest way to get started quickly
At the same time, we will also make some changes to the specific data list code you have selected, such as this

<img width="435" alt="image" src="https://user-images.githubusercontent.com/86196091/236753442-7f21231e-04c1-43ef-bba8-646052443d26.png">

Now let's take a look at what was printed

![Kapture 2023-05-08 at 14 57 24](https://user-images.githubusercontent.com/86196091/236755879-c49ac30e-e820-4620-bb46-b7cd2d5ce367.gif)

<img width="685" alt="image" src="https://user-images.githubusercontent.com/86196091/236756000-cf5fe6ee-c6f2-4252-b371-ad6aedf4758d.png">

The data will be accompanied by your ID and label. If you customize it, the result will be your customized ID or label content

But WTF what is it?

<img width="875" alt="image" src="https://user-images.githubusercontent.com/86196091/236756537-2fa65b66-e89c-420a-9482-78e68bfb6bb6.png">

This is an additional custom field that may be useful to some people. When onChange occurs, the corresponding content can be obtained, and you can place any content here

<img width="431" alt="image" src="https://user-images.githubusercontent.com/86196091/236757193-c54bd201-6d0a-48d3-94df-536e5dc6d133.png">

It is optional


You can also customize the icons used for expanding and collapsing
Selected Icons Select Partial Icons
If you use TS development, you can check for specific types
I believe this won't disappoint you, but I still choose to take a screenshot of a regular type

<img width="328" alt="image" src="https://user-images.githubusercontent.com/86196091/236648085-8095c975-26e3-4c34-90b3-ad1360dcd6ef.png">

If you do not want an option or folder to be selected, you can pass in disable
Perhaps you don't want users to randomly select all items and have them carefully select each one. You just need to disable the upper directory. 
If you need to disable all items, you need to add specific ones to each item

<img width="767" alt="image" src="https://user-images.githubusercontent.com/86196091/236739548-7d9fdb76-3d39-4f87-b43b-b9bfdfb760ab.png">

![Kapture 2023-05-08 at 13 14 38](https://user-images.githubusercontent.com/86196091/236739716-832bf45b-77cf-4fe4-8d8f-6ddbf88f25a2.gif)

These are the content that you can customize to pass in, all of which are optional

You can pass in autoExpand and the selected items like this will automatically expand

<img width="437" alt="image" src="https://user-images.githubusercontent.com/86196091/236802540-01663e26-1277-40c2-95cc-d8e4b0bb8e4f.png">

![Kapture 2023-05-08 at 18 36 29](https://user-images.githubusercontent.com/86196091/236803055-0f5824d3-3459-4e7c-b569-4f6387818b5d.gif)



Of course, just like all mui components, you can also use sx to change the overall style of the components. If you encounter any problems, please come to Github to submit Issues
<a href="https://github.com/SGDS666/m-treeselect">github</a>


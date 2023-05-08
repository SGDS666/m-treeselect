This is a tree selector completely based on mui component encapsulation without using third-party libraries

Has the following characteristics

1.Fully compatible with MUI theme configuration

2 Height Customization Usage

3 Easy to get started 0 Learning costs

4 fully controlled components (state must be manually controlled, but believe me, this has been optimized very easily)

Let's take a look at what it looks like first

<img width="859" alt="image" src="https://user-images.githubusercontent.com/86196091/236647319-ed40f1f5-beb4-4d05-b697-204a664cd16c.png">

The two sides look a bit different because the one on the left is included in the MUI theme and custom folder icons

<img width="509" alt="image" src="https://user-images.githubusercontent.com/86196091/236647351-6b242202-6e8c-4282-a1f1-61f72627a72a.png">

First of all, I believe everyone will be more concerned about data format because it involves practical usage experience
I have designed two data schemes. One is the default format, like this

<img width="422" alt="image" src="https://user-images.githubusercontent.com/86196091/236647435-4e7f32de-e80e-4d0b-90aa-6b98ae4fe26b.png">

The ID determines the key value of your actual control state
The final form of the component is determined by fixed data and controlled checklists in the state
The label determines the content displayed on the page
Whether children have a value determines whether they belong to the directory or a selection item

This is the default format. You don't need to configure anything, just pass in the data that meets the format to use it
But I believe that formatting is a headache in actual business, so I also added a custom format for us to take a look at the following data

<img width="447" alt="image" src="https://user-images.githubusercontent.com/86196091/236647593-76a5348a-e48c-4368-8ebf-0262fd859df4.png">

Adapting components to different formats is the best way to improve efficiency. By specifying the corresponding key, development can proceed happily like this

<img width="450" alt="image" src="https://user-images.githubusercontent.com/86196091/236647625-013aef0c-35ed-450c-95f2-c190739a1976.png">

These data are just the foundation for the initial rendering of the component, and the most challenging aspect is obtaining the data
We can set the default selected items for the component and pass in a checkedDataids array
The data type is the corresponding 'id' value, so there is nothing else to note. It is completely controlled. You need to obtain the latest status update of the component through onChange. The checked Dataids component can work successfully. Let's take a look at the demonstration effect

For the convenience of the demonstration, I added something that looks more intuitive, which is the actual value of the state we maintain

<img width="534" alt="image" src="https://user-images.githubusercontent.com/86196091/236647736-34801150-70ee-4e5e-82f2-8cee2c9328ae.png">

![Kapture 2023-05-07 at 05 48 05](https://user-images.githubusercontent.com/86196091/236647964-acd7436f-6dce-4f14-a095-f143b048837b.gif)


As demonstrated, we only care about who the selected project is
The status of the folder will be maintained by the component itself
OnChange will pass in the results of the operation and update the status directly without any processing

Nothing else is needed. It's that simple. Don't doubt it
If I have to say one more thing
That is, you can not only customize fields
You can also customize rendering using labelRender
like this

<img width="451" alt="image" src="https://user-images.githubusercontent.com/86196091/236660022-e494021a-4855-4881-befc-999dd6306aa9.png">
<img width="459" alt="image" src="https://user-images.githubusercontent.com/86196091/236660027-4ceae507-c580-45e5-a63a-d38df621b6cc.png">




You can also customize the icons used for expanding and collapsing
Selected Icons Select Partial Icons
If you use TS development, you can check for specific types
I believe this won't disappoint you, but I still choose to take a screenshot of a regular type

<img width="328" alt="image" src="https://user-images.githubusercontent.com/86196091/236648085-8095c975-26e3-4c34-90b3-ad1360dcd6ef.png">

If you do not want an option or folder to be selected, you can pass in disable
Perhaps you don't want users to randomly select all items and have them carefully select each one. You just need to disable the upper directory. If you need to disable all items, you need to add specific ones to each item

<img width="767" alt="image" src="https://user-images.githubusercontent.com/86196091/236739548-7d9fdb76-3d39-4f87-b43b-b9bfdfb760ab.png">

![Kapture 2023-05-08 at 13 14 38](https://user-images.githubusercontent.com/86196091/236739716-832bf45b-77cf-4fe4-8d8f-6ddbf88f25a2.gif)

These are the content that you can customize to pass in, all of which are optional
Of course, just like all mui components, you can also use sx to change the overall style of the components. If you encounter any problems, please come to Github to submit Issues
<a href="https://github.com/SGDS666/m-treeselect">github</a>


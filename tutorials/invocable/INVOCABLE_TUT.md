#Creating an Alexa skill with Invocable

![Header] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/header.jpg)

This tutorial was created by [Kai Erne](https://kaierne.de) and [Pascal Ligon](http://pascalligon.de).
You can find our project [here](https://app.invocable.com/shared/projects/53308675d06c3831b223a9ca99f10d43a1963705).
## Preparation

What you need:


* [Invocable](https://www.invocable.com/) Account  
* [Amazon Developer](https://developer.amazon.com/) Account  
* A supported Browser

**Note**: We worked with Google Chrome Version 71.0.3578.98 for MacOS

## Creating a skill

1.  When you first log in to your Invocable account, you see a list of templates on the left side of your screen. 

2. After clicking on Create Skill you have to enter a name and pick a language.

	We figured that English offered the most functions and works the best.
	
	![create] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/creating_a_skill.png)

3. Edit the given blocks or create a new Regular Block.

4. Create an Alexa Output by adding what Alexa is supposed to say.

5. Create an user input.

	**Note**: You can also create Synonyms or add Variables to the users input.

6. Add a visual by uploading your pictures.
	
	![block] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/block.png)

7. Link the user reply to a different block. You can pick an existing block or create a new one.
	
	![link] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/linking_a_block.png)

8. Repeat this process until you finished your skill.

When you are happy with your result, you can upload your skill to Alexa with the button on the top right corner.

##How to test your skill

Go to the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask). Your skill should be listed here.

Once you open your skill, go to test and start the skill by saying or typing the command:

`open YourSkillName`

Then you can start to test your skill in the developer console.

##Problems
When creating our skill we found multiple problems and could solve most of them. Here are some examples:

###Adding text to the user input:
If you want to add a variable that recognises any user input you have no proper option in the given Amazon variables.
We figured out that if you use the variable "Fictional Character", you can use any input and wont need a certain keyword.

###Adding visuals
When adding visuals there is no option to add visuals for multiple screens at once. Also you have to upload pictures and are only able to add rectangles if you use the built in editor.

###Presenting your skill
If you added visuals there is no other way to present your skill than either using a Echo Show device or opening the developer console. We solved this problem by screensharing the visual part of the developer window to another monitor.


##Hello World

1. First we need to create a skill by clicking on the "Create a skill" button.  

	![create] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/create.png)

2. We are going to name the skill "Hello World"

	![name] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/Name.png)

3. The created skill starts with some preset blocks.

	![preset] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/preset.png)

4. The welcome block can be edited with a short Alexa output

	![helloworld] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/helloworld.png)
	
5. Finally you can upload the skill to Alexa
	
	![upload] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/upload.png)
	
6. Open the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask) and pick your skill from the list

7. Click on "Test"

8. By entering the command `start Hello World` you can start testing your skill
	
	![develop] (/Users/pascalligon/Studium/4. Semester/System Design/Tutorial/tutorial_screens/develop.png)

# Seatwork #2 - Getting to know CSS Position and z-index.
### This seatwork will ask you to implement the different CSS position on a given code.
### short link to this .md file is: https://bit.ly/4c61P9K
#### Resources (also found in Khub week 5)
- [4 Minute Youtube Video on CSS Position](https://www.youtube.com/watch?v=YEmdHbQBCSQ)
- [CSS Position Tutorial](https://roycan.github.io/CssPositioningZIndexLab/)

### Instructions: 
1. This is individual submission in khub, but you can work with a partner.  When you submit in khub please place both your names in the submission bin.
2. Guided Activity (30 minutes), please follow what is being required.  

    - Make a copy of this .md file to your Q4 repository and name it as **SectionLNseatwork2.md** example **9LiCruzSeatwork2.md**. Place it in your q4 repository vscode local computer. Committing frequently to your Github repository.  
    - Copy the code below and paste it inside a new file (name it as SectionLNseatwork2.html). Place this file in the same location where the .md file is saved. 
    - Change the content values of the meta tags to your names for author/s and the date today for revised.
    - Please do the following tasks that will ask you to reposition HTML elements then answer the guided question for each task on the .md file. Commit changes to the .md file and to the .html file as well.
    **- This seatwork is worth 20pts and should be submitted by the end of the period** The link to [KHub submission bin](https://khub.mc.pshs.edu.ph/mod/assign/view.php?id=15481).
      - Submit the links to your .md file and .html file.

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="author" content="<your names>" />
  <meta name="revised" content="<date today>" />
  <style>
    body { font-family: Arial, sans-serif; }
    .header, .footer {
      background: lightblue;
      padding: 10px;
    }
    .footer {
       opacity: 0.5;
    }
    .sidebar {
      background: lightgreen;
      width: 150px;
      height: 200px;
    }
    .content {
      background: lightyellow;
      width: 300px;
      height: 200px;
    }    
  </style>
</head>
<body>
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="content">Main Content</div>
  <div class="footer">Footer</div>
</body>
</html>
```
### Step 1 (Static vs Relative):

- Add in css ```position: relative; top: 20px; left: 20px;``` to .sidebar.

- Guided Question: What changed compared to the default static positioning? Try to give different values to top and left or you can change it to bottom, right.

- Answer: The sidebar's position changed with reference to its static positioning. To elaborate, the offset's reference is its normal or static positioning rather than the whole screen. By giving different values, you move its static positioning by the magnitude of the values.

### Step 2 (Fixed):

- Add in css ```position: fixed; bottom: 0; width: 100%;``` to .footer.

- Guided Question: What happens when you scroll the page? Why does the footer behave differently from position relative?

- Answer: The footers's position stays fixed when you scroll the page. The footer behaves differently from position relative because the position fixed tells the footer to move to the pixels you give with reference to the whole screen and stay there even when you scroll.

### Step 3 (Absolute):

- Add in css ```position: absolute; top: 66px; left: 200px;``` to .content.

- Guided Question: What is the effect of position: absolute on an element? How is it different from fixed?

- Answer: This makes the content move to its closest positioned ancestor (another item that has a position rather than static) and is translated relative to that position based on its values of top, right, bottom, and left.

### Step 4 : (Absolute)

- Add in html ```<div class="notice">Notice!</div>``` and include the css below:

```css
.notice {
    position: absolute;
    top: 60px;
    left: 400px;
    background: orange;
    padding: 10px;
    z-index: 2;
}
```

- Give .content a z-index: 1.

- Guided Question: Why does the notice appear on top of the content? What happens if you swap the z‑index values?

- Answer: The notice appears on top of the content because it has a higher z-index value. If the z-index values are swapped, then the content appears on top.

- Challenge: 
    * What changes that you have to do on the code that will position .notice box on the top right corner of the .content box? Please write the code on paper as well (both html and css on the part of .notice and .content).
      - You make .content the parent div containing .notice inside it,and change top and right values of .notice to both 0.
    * Try to change the position of .content to relative then to fixed. What do you observed each time?
      - The .notice, child div, moves with it. 
    * What do you observe on about the effect of z-index on .notice and .content boxes?
      - It changes the order of layers between the child and parent divs.

3. Please answer the following reflection questions (15 minutes)

    a. Could you summarize the differences between the CSS position values (static, relative, absolute, fixed)? 
      - The static position is an item's normal position without applying any style, and this is used as reference to when you are using position: relative. The position: absolute moves the item to another item that also uses positions and uses this item as reference to when you are translating the item. Whereas, the position:fixed 

    b. How does absolute positioning depend on its parent element?
      - The absolute positioning depends on its parent element by using the parent's padding as margin.

    c. How do you differentiate sticky from fixed (you can research on sticky)?
      - The sticky behaves like position:relative, where the item moves as you scroll. However, when you reach a specific offset, it behaves like position:fixed.

    d. If you were designing a webpage for a school event, how might you use positioning to highlight important information? Please give concrete examples.
      - You would use position:fixed for the navigation bar and footer, position:absolute to the content, and position:relative to additional information.
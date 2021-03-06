# react-wheel
React carousel implementation

react-wheel is a individual react carousel component. Gatsby is used for development.

There is currently not a way to install as a package, but
feel free to use the source code. The License is MIT. See LICENSE

You can see a recent picture in the main directory:

        react-wheel.png

### Running the sample page
The sample page at:
 
    src/react-wheel/pages/index.js

First clone react-wheel

    $ git clone https://github.com/sreeise/react-wheel.git
    
Go into the development directory

    // There will be another directory named react-wheel under src
    $ cd src/react-wheel
    
Use npm to run the example

    $ npm install
    $ npm run start
    
Then go to:

    localhost:8000

### Props

    // dark or light - changes arrows color based on theme
    theme={"light"} 
    
    // Arrow click color. One of blue, red, purple, orange, yellow, or amber
    arrowColor={"purple"}  
    
    // Amount of children to show in each slide
    slidesShowing={2}
    
    // Slides rotate infinitely - defaults to false
    infinite={true}
    
    // Duration of slide leaving and entering in milliseconds
    enterDuration={800} 
    leaveDuration={400}
    
    // one of 0, 8, 24, 40 - changes spacing between carousel and arrows  
    spacing={0}
    
    // Slide to start out at - defaults to 0
    startSlide={1}

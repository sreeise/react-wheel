# react-wheel
React carousel implementation

react-wheel is a individual component on Bit that can be integrated into any application.
Gatsby is used for development.

Still very much a work in progress. You can see a recent picture in the main directory:

        react-wheel.png

Future Changes: See enhancements/bugs in issues.

### Running the sample page
The sample page at:
 
    src/react-wheel/pages/index.js

First clone react-wheel

    $ git clone https://github.com/sreeise/react-wheel.git
    
Go into the development directory

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
    
    // Duration of slide leaving and entering in milliseconds
    enterDuration={800} 
    leaveDuration={400}
    
    // one of 0, 8, 24, 40 - changes spacing between carousel and arrows  
    spacing={0}
    
    // Slide to start out at - defaults to 0
    startSlide={1}

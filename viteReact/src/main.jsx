import React  from 'react'
import { createRoot} from 'react-dom/client'
import App from './App.jsx'

function MyApp() {
    return(
        <h1>All hail the King !</h1>
    );
}

const ReactElement = {
    type: 'a',
    props:{
        href: 'https://google.com',
        target: '_blank',
    },
    children: 'Click me to visit google',

}

const simpleVariable = (
    <a href = "https://google.com">click here to visit google|||</a>
)

const anotherUser= "Mozilla Firefox";

//with react predefined syntax working behind and React.createElement
const reactElement = React.createElement(
    'a',
    {href: 'https://google.com', target: '_blank'},
    'Click to visit google !!',
    anotherUser
)

createRoot(document.getElementById('root')).render(
    <App/>,
    //App(), // works same as <App/>
    // MyApp(), //works
    //<MyApp/>, //works
    //ReactElement, //doesn't work as object doesn't satisfy predefinded syntax
    //simpleVariable,//works as it just contain simple HTML
    //reactElement, works as it use React.createElement and predefined syntax
)   

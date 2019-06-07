import React from 'react';
import Snake from './screens/Snake';
import Timer from './screens/Timer';
import Stats from './screens/Stats';

const App: React.FC = () => {
    return (
        <div id='snake'>
            <Stats />
            <Snake />
        </div>
    );
};

export default App;

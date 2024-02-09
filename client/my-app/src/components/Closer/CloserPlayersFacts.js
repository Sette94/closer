import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./styles/CloserGeneral.css"
import FlipNumbers from 'react-flip-numbers';
import { PieChart } from 'react-minimal-pie-chart';
import { RadialGauge } from 'react-canvas-gauges';
import { LineChart } from '@mui/x-charts/LineChart';
import { listClasses } from '@mui/material';


function CloserPlayers() {



    return (
        <div>
            Players
        </div>
    )

}

export default CloserPlayers
import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProgressBar from './ProgressBar';
import image from '../assets/Destiny2.png';
import image1 from '../assets/NBA2k20.png';
import image2 from '../assets/mafia_remastred.png';


function GameCard({game,index}) {
  let pic = null;
  if(game.name == 'mafia_remastred'){
    pic= image2;
  }else if(game.name== 'NBA2k20'){
    pic = image1;
  }else{
    pic = image
  }
  let sum = (game['Very positive'] ? game['Very positive'] : 0) + (game['Very negative'] ? game['Very negative'] : 0) + (game['Positive'] ? game['Positive'] : 0) + (game.Neutral ? game.Neutral : 0) + (game['Negative'] ? game['Negative'] : 0) ;
  let readings = [
    
    {
      name: 'Very Happy',
      value: ((game['Very positive'] ? game['Very positive'] : 0) / sum * 100).toFixed(1),
      color: 'rgb(34, 82, 238)'
  },
{
  name: 'Happy',
  value: ((game['Positive'] ? game['Positive'] : 0) / sum * 100).toFixed(1),
  color: 'rgb(36, 241, 53)'
},
{
  name: 'Satisfied',
  value: ((game.Neutral ? game.Neutral : 0) / sum * 100).toFixed(1),
  color: 'rgb(147, 225, 227)'
},
{
  name: 'Disappointed',
  value: ((game['Negative'] ? game['Negative'] : 0) / sum * 100).toFixed(1),
  color: 'rgb(231, 164, 39)'
},
{
  name: 'Very Disappointed',
  value: ((game['Very negative'] ? game['Very negative'] : 0) / sum * 100).toFixed(1),
  color: 'rgb(243, 89, 17)'
},
];

  return (
    <>

    <div style={{width:'1100px',height:'270px',display:'flex', flexDirection:'row'}}>
      <div>
        <img src={pic} alt='#' style={{width:'200px',height:'250px',margin:'10px'}}/>
      </div>
      <div style={{display:'flex', width:'100%',flexDirection:'column'}}>
        <div>
        <h2 style={{fontFamily:'Quicksand', marginLeft:'20px'}}>
          {game.name}
          </h2>
      </div>
      <div style={{margin:'20px'}}>
      <ProgressBar readings={readings} width={'100%'} />
      <div>
        <h3 style={{fontFamily:'Quicksand', marginLeft:'20px',color:'gray'}}>
          {'Total Reviews: ' + sum}
          </h3>
      </div>
      </div>
      </div>
      
    </div>
    </>
  )
}

export default GameCard
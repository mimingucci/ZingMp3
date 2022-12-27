import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SectionItem from './SectionItem';

const PlaylistSearch = () => {
    const {searchdata}=useSelector(state=>state.app);
    let rows;
    
        if(searchdata?.playlists.length%5===0){
            rows=searchdata?.playlists.length/5;
        }else{
            rows=Math.floor(searchdata?.playlists.length/5)+1;
        }
        let playlists=Array(rows).fill(Array(5));
        if(searchdata?.playlists?.length%5===0){
            for(let i=0; i<rows; i++){
                for(let j=0; j<5; j++){
                    playlists[i][j]=searchdata?.playlists[i*5+j];
                }
            }
        }else{
            let sodu=searchdata?.playlists.length%5;
            for(let a=0; a<rows-1; a++){
                for(let b=0; b<5; b++){
                    playlists[a][b]=searchdata?.playlists[a*5+b];
                }
            }
            for(let k=0; k<sodu; k++){
                playlists[rows-1][k]=searchdata?.playlists[5*(rows-1)+k];
            }
        }
        console.log(playlists);
        // if(searchdata?.playlists.length%5===0){
        //     console.log(1);
        // }else{
        //     console.log(searchdata?.playlists[6]);
        //     console.log(playlists);
        // }
    
   
    
    //console.log(searchdata);
  return (
    <div className='w-full h-full'>
        <div className='px-[60px] mt-5'>
            <div className='text-[20px] font-semibold text-left'>Playlist/Album</div>
            <div className='mt-5'>
                {
                // searchdata?.playlists.
                // map((playlist, index)=><SectionItem thumbnailM={playlist.thumbnailM} title={playlist.title} artists={playlist.artistsNames} songId={playlist.encodeId}/>)
                playlists.map((rows, index)=><div className='flex gap-5 w-full mb-5'>
                    {rows.map((playlist, index)=><SectionItem thumbnailM={playlist.thumbnailM} title={playlist.title} artists={playlist.artistsNames} songId={playlist.encodeId}/>)}
                </div>)
            }
            </div>
        </div>
    </div>
  )
}

export default PlaylistSearch
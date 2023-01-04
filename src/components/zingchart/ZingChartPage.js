import React, { useEffect, useState, useRef } from 'react'
import * as apis from '../../getApi' 
import * as actions from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import bgChart from '../../assets/bg-chart/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'
import icons from '../../utils/icons'

import SongItem from '../home/SongItem'
import Top100 from './Top100'
const {BsFillPlayFill}=icons;
const ZingChartPage = () => {
  const {chart}=useSelector(state=>state.app);
  console.log(chart);
  const {vietnam}=useSelector(state=>state.top100);
  const dispatch=useDispatch(); 
  console.log(vietnam);
  const [data, setData] = useState(null);
    const chartRef = useRef()
    const [tooltip, setTooltip] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    })
    const [tooltipData, setTooltipData] = useState();
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
                min: chart?.chart?.minScore,
                max: chart?.chart?.maxScore,
                border: { dash: [3, 4] }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: (ctx) => {
                    const data = []
                    for (let i = 0; i < 3; i++)
                        data.push({
                            encodeId: Object.keys(chart?.chart?.items)[i],
                            data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter)
                        })
                    const tooltipModel = ctx.tooltip
                    setTooltipData(data?.find(i => i?.data?.some(n => n === +tooltipModel?.body[0]?.lines[0].replace(',', '')))?.encodeId)
                    if (tooltipModel.opacity === 0) {
                        if (tooltip.opacity !== 0) setTooltip(prev => ({ ...prev, opacity: 0 }))
                        return
                    }
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltipModel.caretX,
                        top: tooltipModel.caretY,
                    }
                    if (!_.isEqual(tooltip, newTooltipData)) setTooltip(newTooltipData)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }
    
    useEffect(() => {
        const labels = chart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 4
                })
            }
            setData({ labels, datasets })
        }
    }, [chart])
    
  useEffect(()=>{
    const callApi=async()=>{
      const response=await apis.getHome();
      const [top100vietnam, top100usuk, top100kpop]=await Promise.all([apis.apiGetDetaiPlaylist(response?.data?.data?.items.find(item=>item.sectionId==="h100")?.items[0].encodeId),
      apis.apiGetDetaiPlaylist(response?.data?.data?.items.find(item=>item.sectionId==="h100")?.items[1].encodeId),
      apis.apiGetDetaiPlaylist(response?.data?.data?.items.find(item=>item.sectionId==="h100")?.items[4].encodeId),
    ]);
      console.log(response);
      
      if(response?.data.err===0){
        dispatch(actions.setChart(response?.data?.data?.items.find(item=>(item.sectionType==="weekChart")).items, response?.data?.data?.items.find(item=>(item.sectionId==="hZC" && item.sectionType==="RTChart"))));
         dispatch(actions.setTop100Vietnam(top100vietnam?.data?.data?.song?.items, top100usuk?.data?.data?.song?.items, top100kpop?.data?.data?.song?.items));         
        }
     }
     callApi();
  }, []);
  return (
    <div className='w-full h-auto bg-main-300 block'>
        <div className='w-full h-fit pb-10'>
        <div className='relative max-h-[430px] rounded-md overflow-hidden'>
            <img src={bgChart} alt="bg-chart" className='w-full object-cover rounded-md max-h-[430px]' />
            <div className='absolute top-0 z-10 left-0 right-0 bg-[rgba(21,14,32,0.9)] bottom-0'></div>
            <div className='absolute top-0 z-20 left-[20px] right-[20px] bottom-0 p-5 flex flex-col gap-8'>
                <h3 className='text-[40px] text-text-100 font-bold text-left cursor-pointer hover:text-main-500 flex items-center gap-2'>#zingchart <span className='rounded-full border bg-white text-main-500 hover:bg-[#ced5e3]'><BsFillPlayFill/></span></h3>
                <div className='flex gap-4 h-fit'>
                    
                    {data && <div className='flex-5 relative w-[100%] h-auto'>
                        <Line ref={chartRef} data={data} options={options} />
                        <div className='tooltip' style={{ top: tooltip.top, left: tooltip.left, position: 'absolute', opacity: tooltip.opacity }}>
                            <SongItem
                                thumbnail={chart?.items?.find(i => i.encodeId === tooltipData)?.thumbnailM}
                                title={chart?.items?.find(i => i.encodeId === tooltipData)?.title}
                                artists={chart?.items?.find(i => i.encodeId === tooltipData)?.artistsNames}
                                songId={chart?.items?.find(i => i.encodeId === tooltipData)?.encodeId}
                                timeRelease={null}
                                playlist={chart?.items}
                                style='bg-white text-text-200'
                            />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
       
        <Top100/>
        </div>
    </div>
  )
 
    
}

export default ZingChartPage
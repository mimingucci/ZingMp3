import React, {memo, useRef, useState, useEffect} from 'react'
import bgChart from '../../assets/bg-chart/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import icons from '../../utils/icons'
import { NavLink } from 'react-router-dom'

import SongItem from './SongItem'

const {BsFillPlayFill}=icons;
const ChartSection = () => {
    const {chart, weekChart}=useSelector(state=>state.app);
    //console.log(weekChart);
    const [data, setData] = useState(null);
    const chartRef = useRef()
    const [tooltip, setTooltip] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    })
    const [tooltipData, setTooltipData] = useState(null)
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
                    setTooltipData(data.find(i => i.data.some(n => n === +tooltipModel.body[0].lines[0].replace(',', '')))?.encodeId)
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
    // console.log({ tooltipData, rank });
    // console.log({ chart, rank });
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
    return (
        <div className='w-full h-fit pb-10'>
        <div className='mt-12 relative max-h-[430px] rounded-md overflow-hidden'>
            <img src={bgChart} alt="bg-chart" className='w-full object-cover rounded-md max-h-[430px]' />
            <div className='absolute top-0 z-10 left-0 right-0 bg-[rgba(77,34,104,0.9)] bottom-0'></div>
            <div className='absolute top-0 z-20 left-[20px] right-[20px] bottom-0 p-5 flex flex-col gap-8'>
                <h3 className='text-2xl text-white font-bold text-left cursor-pointer hover:text-main-500 flex items-center gap-2'>#zingchart <span className='rounded-full border bg-white text-main-500 hover:bg-[#ced5e3]'><BsFillPlayFill/></span></h3>
                <div className='flex gap-4 h-full'>
                    <div className='flex-5 flex flex-col gap-2 w-[40%]'>
                        {chart?.items?.filter((i, index) => index < 3)?.map((item, index) => (
                            <SongItem
                            key={item.encodeId}
                            thumbnail={item.thumbnailM}
                            title={item.title}
                            artists={item.artistsNames}
                            timeRelease={item.releaseDate}
                            songId={item.encodeId}
                            playlist={chart?.items}
                            style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]'
                            order={index + 1}
                            percent={Math.round(+item.score * 100 / +chart?.chart?.totalScore)}
                         />
                                // key={item.encodeId}
                                // thumbnail={item.thumbnail}
                                // title={item.title}
                                // artists={item.artistsNames}
                                // sid={item.encodeId}
                                // order={index + 1}
                                // percent={Math.round(+item.score * 100 / +chart?.totalScore)}
                               // style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]'
                        ))}
                        <div className='h-7 flex items-center justify-center mt-2'><span className='h-full w-[30%] rounded-full border flex items-center justify-center text-center cursor-pointer hover:bg-[#945EA7]'>Xem thêm</span></div>
                    </div>
                    {data && <div className='flex-5 relative w-[60%]'>
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
        <div className='w-full mt-[50px] flex gap-6 rounded-md overflow-hidden'>
          {weekChart.map(item=>
            (
            <NavLink
            to={item.link.split('.')[0]}
            >
            <div>
            <img src={item.cover} alt='Week Chart' className='rounded-md cursor-pointer'/>
          </div>
            </NavLink>
            )
          )}
          
        </div>
        </div>
    )
}

export default memo(ChartSection)
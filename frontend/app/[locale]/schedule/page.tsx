"use client"

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import viLocale from 'date-fns/locale/vi'
import { useCallback, useState } from 'react';

const locales = {
    'vi': viLocale,
}

const messages = {
    allDay: 'Tất cả ngày',
    previous: '<',
    next: '>',
    today: 'Hôm nay',
    month: 'Tháng',
    week: 'Tuần',
    day: 'Ngày',
    agenda: 'Chi tiết',
    noEventsInRange: 'Không có sự kiện trong khoảng thời gian này',
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const EVENTS: any = [
    {
        id: 1,
        title: 'MS training 1',
        allDay: true,
        start: new Date(2024, 1, 1, 14, 0, 0),
        end: new Date(2024, 1, 6, 16, 30, 0),
    },
    {
        id: 2,
        title: 'MS training 2',
        allDay: true,
        start: new Date(2024, 1, 1, 14, 0, 0),
        end: new Date(2024, 1, 3, 16, 30, 0),
    },
    {
        id: 3,
        title: 'MS training 3',
        allDay: true,
        start: new Date(2024, 1, 1, 14, 0, 0),
        end: new Date(2024, 1, 3, 16, 30, 0),
    },
]

const Schedule: React.FC = () => {
    const [myEvents, setEvents] = useState<any>(EVENTS)

    const handleSelectSlot = useCallback(
        ({ start, end }: any) => {
            const title = window.prompt('New Event name')
            if (title) {
                setEvents((prev: any) => [...prev, { start, end, title }])
            }
        },
        [setEvents]
    )
    return (
        <div className="my-8 container text-[26px] text-slate-500 font-bold text-center uppercase">
            <div className="rounded-lg bg-white shadow-lg p-4">
                <Calendar
                    className="h-full"
                    messages={messages}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    culture="vi"
                    events={myEvents}
                    onSelectSlot={handleSelectSlot}
                    selectable
                />
            </div>
        </div>
    )
}

export default Schedule

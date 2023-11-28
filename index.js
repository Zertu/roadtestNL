const axios = require('axios');
const dayjs = require('dayjs');
const sound = require("sound-play");
const path = require("path");
const { call } = require('./call');
const config = require('./config');
const instance = axios.create({
    baseURL: 'https://www.mrdappointments.gov.nl.ca/qmaticwebbooking/rest/schedule/branches/1eeaa32dbd6d7ead5a17b8aa3c7d12544e70ad5bad55eab02d3e03893d2eb42e/'
})
const locationUrl = `dates;servicePublicId=378dcad3a2874a41a1018cb96d57a21c63912e1884dead32d94d14b244abe8ae;customSlotLength=30`
const get = async (url) => {
    try {
        const response = await instance.get(url)
        return response.data
    }
    catch {
        return []
    }
}
const query = async () => {
    const datas = await get(locationUrl)
    console.log(`query at ${new Date()}, here is the result: ${datas.map(i => i.date).join(', ')}`)
    if (datas.length) {
        const date = datas[0].date
        if (dayjs(date).isAfter(dayjs(config.startDate)) && dayjs(date).isBefore(dayjs(config.endDate))) {
            const url = `dates/${date}/times;servicePublicId=378dcad3a2874a41a1018cb96d57a21c63912e1884dead32d94d14b244abe8ae;customSlotLength=30`
            const result = await get(url)
            if (result[0]?.time)
                playAudio()
            if (config.call) {
                call()
            }
            console.log(result)
        } else {
            console.log(`no available date, the latest date is ${date}`)
        }
    }
}
let flag = false
const playAudio = async () => {
    if (flag == false) {
        flag = true
        await sound.play(path.join(__dirname, "foo.mp3"))
        flag = false
    }
}
// scheduleJob('5-55 * * * * *', query)
setInterval(() => {
    query()
}, 1000);

const{ SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const apiKey = "25c1ae52cc88080902fb099e2d9e26f1";
const imperialUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q='
const metricUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const unsplashUrl = 'https://source.unsplash.com/512x512/?'
const imageUrl = "https://www.openweathermap.org/img/wn/"
let response = ''
let degree = ''
let lengthUnit = ''
const date = new Date()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('shows weather of any city')
    .addStringOption(option => option.setName('city').setDescription('put the city you want to display weather from').setRequired(true))
    .addStringOption(option => option.setName('unit-system').setDescription('Do you want imperial or metric?').setRequired(true).addChoices({name: 'Metric', value: 'metric'}, {name: 'Imperial', value: 'imperial'})),
    async execute(interaction, client) {
        const cityName = interaction.options.getString('city')
        const unitSystem = interaction.options.getString('unit-system')
        if(unitSystem == 'imperial'){
            response = await fetch(imperialUrl + cityName + `&appId=${apiKey}`);
            degree = '°F';
            lengthUnit = 'mph';
        }
        else if(unitSystem == 'metric'){
            response = await fetch(metricUrl + cityName + `&appId=${apiKey}`);
            degree = '°C';
            lengthUnit = 'm/s';
        }
        var data2 = await response.json();
        cityNameNoSpace = cityName.replace(/\s/g, '');
        
        
        const embed = new EmbedBuilder()
            .setTitle(`Weather for ${cityName}:`)
            .setThumbnail(imageUrl+data2.weather[0].icon+'.png')
            .setImage(unsplashUrl+cityNameNoSpace)
            .addFields([
                {
                    name: 'Weather',
                    value:`${data2.weather[0].main}`,
                    inline: true
                },
                {
                    name: 'Description',
                    value: `${data2.weather[0].description}`,
                    inline: true
                },
                {
                    name: 'Temperature',
                    value: `${data2.main.temp} ${degree}`,
                    inline: true
                },
                {
                    name: 'Humidity',
                    value: `${data2.main.humidity}%`,
                    inline: true
                },
                {
                    name: 'Wind Speed',
                    value: `${data2.wind.speed} ${lengthUnit}`,
                    inline: true
                },
                {
                    name: 'Date Recorded',
                    value: `${date}`,
                    inline: true
                }
            ])
        await interaction.reply({
            embeds: [embed]
        })
    }
}
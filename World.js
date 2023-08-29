class TimeOfDay{
    constructor(Name, Icon, Color){
        this.Name = Name;
        this.Icon = Icon;
        this.Color = Color;
    }
}

const TimeOfDayEnum = {
    Night: new TimeOfDay(    'Night',    '🌕', "#2C3E50"),
    Morning: new TimeOfDay(  'Morning',  '⛅️', "#FF8C66"),
    Afternoon: new TimeOfDay('Afternoon','☀️', "#87CEEB"),
    Evening: new TimeOfDay(  'Evening',  '🌇', "#6B5B95"),
}

class World extends BaseGameEntity {
    constructor(id){
        super(id)

        this.CurrentTime = 0;
        this.DayCount = 0;
        this.TimeOfDay = TimeOfDayEnum.Night;

        this.UpdateUI();
    }

    Update(){
        this.UpdateTick();
        this.UpdateTimeOfDay();
        this.UpdateUI();
    }

    UpdateTick(){
        if(this.CurrentTime++ >= 64){
            this.DayCount++;
            this.CurrentTime = 0;
        }
    }

    UpdateTimeOfDay(){
        if (this.CurrentTime >= 0 && this.CurrentTime < 16){
            this.TimeOfDay = TimeOfDayEnum.Night;
        } else if (this.CurrentTime >= 16 && this.CurrentTime < 32){
            this.TimeOfDay = TimeOfDayEnum.Morning;
        } else if (this.CurrentTime >= 32 && this.CurrentTime < 48){
            this.TimeOfDay = TimeOfDayEnum.Afternoon;
        } else {
            this.TimeOfDay = TimeOfDayEnum.Evening;
        }

        this.ChangeBackgroundColor();
    }

    UpdateUI(){
        document.getElementById("CurrentTime").textContent = this.CurrentTime;
        document.getElementById("DayCount").textContent = this.DayCount;
        document.getElementById("TimeOfDay").textContent = this.TimeOfDay.Name;
        document.getElementById("WeatherIcon").textContent = this.TimeOfDay.Icon;
    }

    ChangeBackgroundColor(){
        document.getElementById("WorldPropertyTable").style.backgroundColor = this.TimeOfDay.Color;
    }

    static IsNightTime(){
        return this.TimeOfDay == TimeOfDayEnum.Night;
    }

    static IsMorningTime(){
        return this.TimeOfDay == TimeOfDayEnum.Morning;
    }

    static IsAfternoonTime(){
        return this.TimeOfDay == TimeOfDayEnum.Afternoon;
    }

    static IsEveningTime(){
        return this.TimeOfDay == TimeOfDayEnum.Evening;
    }
    
}
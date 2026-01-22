import { error } from "console";
import { resolve } from "path"

export const getChartData = async(optionSelected:string):Promise<{name: string, value: number}[]> => {
    const token=localStorage.getItem('token');
    return new Promise(resolve=>{
        let currentMonth = (new Date()).getMonth() + 1;
        if(optionSelected=="0")
        fetch('http://192.168.80.106:5013/api/Assignment/statisticbymonth/' + currentMonth + '/', {
            method:'GET',
            headers: {
                'Authorization':`Bearer ${token}`
            }
        }).then(response=>response.json())
        .then(data=>{
            console.log(data);
            resolve(data)
        })
        .catch(error=>console.log(error))
        else if(optionSelected=="1"){
            fetch('http://192.168.80.106:5013/api/Assignment/statisticbyweek/' + currentMonth + '/', {
                method:'GET',
                headers: {
                    'Authorization':`Bearer ${token}`
                }
            }).then(response=>response.json())
            .then(data=>{
                console.log(data);
                resolve(data)
            })
            .catch(error=>console.log(error))
        }
        else{
            fetch('http://192.168.80.106:5013/api/Assignment/statisticbyyear/', {
                method:'GET',
                headers: {
                    'Authorization':`Bearer ${token}`
                }
            }).then(response=>response.json())
            .then(data=>{
                console.log(data);
                resolve(data)
            })
            .catch(error=>console.log(error))
        }
    })
}
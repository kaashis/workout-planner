const WGER_API = "https://wger.de/api/v2/exercise";

let exerciseFormInfo = document.querySelector("#exercise-info");
exerciseFormInfo.addEventListener("submit", handleFormSubmit);
let equipArr = [];


function handleFormSubmit(evt) {
    evt.preventDefault();
    const muscleGroup = exerciseFormInfo.musclegroupradio.value;
    const equipment = document.querySelectorAll('input[type="checkbox"]:checked');
    for ( var i = 0; i < equipment.length; i++) {
        equipArr.push(equipment[i].value);
    }
    const lang = exerciseFormInfo.language.value;
    const equipParam = equipArr.toString();
    const params = `?language=${lang}&musclescategory=${muscleGroup}&equipment=${equipParam}`;

    console.log(WGER_API+params),

    axios.get(WGER_API+params).then((res) =>console.log(res.data))
}
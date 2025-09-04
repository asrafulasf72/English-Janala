const loadLesson=()=>{
    const url='https://openapi.programming-hero.com/api/levels/all';
    fetch(url) //promis of Response
    .then((res)=>res.json()) //promise of Json Data
    .then((json)=>displaylesson(json.data));
}

const loadWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>displayWord(json.data));
}

const displayWord=(words)=>{
        const wordContainer=document.getElementById("word-container")
        wordContainer.innerHTML="";

        words.forEach((word) =>{
            const card=document.createElement("div");
            card.innerHTML=`
            <p>Cat</p>
            `
          wordContainer.append(card);
        })
}


const displaylesson=(lessons)=>{
       const levelContainer=document.getElementById('level-container')
       levelContainer.innerHTML="";

       for (let lesson of lessons){
          console.log(lesson);
          const card=document.createElement("div")
          card.innerHTML=`
          
             <button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary">Lesson - ${lesson.level_no}</button>
          
          `
          levelContainer.append(card)
       }
}
loadLesson();


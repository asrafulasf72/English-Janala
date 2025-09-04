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
               <div class="bg-white py-10 px-5 text-center shadow-sm space-y-4 rounded-[12px]">
                    <h1 class="font-bold text-2xl">${word.word}</h1>
                    <p class="font-semibold">Meaning / pronunciation</p>
                    <div class="font-medium font-bangla text-2xl">"${word.meaning} / ${word.pronunciation}"</div>
                    <div class="flex justify-between items-center">
                         <button class="bg-sky-100 w-10 h-10 rounded-[8px] hover:bg-sky-300"><i class="fa-solid fa-circle-info"></i></button>
                         <button class="bg-sky-100 w-10 h-10 rounded-[8px] hover:bg-sky-300"><i class="fa-solid fa-volume-low"></i></button>
                    </div>
                 </div>
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


const createElement=(arr)=>{
  const htmlElements=arr.map(el=> `<span class="btn bg-sky-200 rounded-[5px]">${el}</span>`);
  return (htmlElements.join(" "));
}

const manageSpinner=(status)=>{
  if(status==true){
    document.getElementById("spinner").classList.remove("invisible")
    document.getElementById("word-container").classList.add("invisible")
  }else{
       document.getElementById("word-container").classList.remove("invisible")
       document.getElementById("spinner").classList.add("invisible")
  }
}

const loadLesson=()=>{
    const url='https://openapi.programming-hero.com/api/levels/all';
    fetch(url) //promis of Response
    .then((res)=>res.json()) //promise of Json Data
    .then((json)=>displaylesson(json.data));
}

const removeBtn=()=>{
          const BtnRemove=document.querySelectorAll('.lesson-btn')
          BtnRemove.forEach(btn=>{
            btn.classList.remove('active')
          })
}

const loadWord=(id)=>{

  manageSpinner(true);
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>{
        removeBtn();
         const clickBtn=document.getElementById(`lesson-btn-${id}`)
           clickBtn.classList.add('active')
        displayWord(json.data)
    });
}

const loadWordDetail = async(id)=>{
      const url=`https://openapi.programming-hero.com/api/word/${id}`
      const res = await fetch(url);
      const details= await res.json();
      displayWordDetail(details.data);
};

const displayWordDetail=(word)=>{
       console.log(word)
       const detailBox=document.getElementById("detail-container");
       detailBox.innerHTML=`
           <div>
                 <h1 class="text-2xl font-bold"> ${word.word}(<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h1>
           </div>
            <div>
                      <h2 class="text-1xl font-medium">Meaning</h2>
                      <p>${word.meaning}</p>
           </div>
            <div>
                      <h2 class="text-xl font-semibold ">Example</h2>
                      <p class="text-xl font-medium">${word.sentence}</p>
            </div>

             <div>
                      <h2 class="text-xl font-medium space-y-1.5">Synonyms</h2>
                    <div class="">${createElement(word.synonyms)}</div>
                     
              </div>
       `
       document.getElementById('my_modal_5').showModal();
}

const displayWord=(words)=>{
        const wordContainer=document.getElementById("word-container")
        wordContainer.innerHTML="";

        if(words.length==0){
            wordContainer.innerHTML=`
                     <div class="text-center col-span-full rounded space-y-4">
                     <img class="text-center mx-auto" src="./assets/alert-error.png" alt="">
                     <p class="text-xl font-medium text-gray-400 font-bangla">এই Lesson এ এখনো কোন <span>Vocabulary</span> যুক্ত করা হয়নি।</p>
                     <h2 class="text-3xl font-bold font-bangla">নেক্সট <span>Lesson</span> এ যান।</h2>
                </div>
            `
            manageSpinner(false)
            return;
        }

        words.forEach((word) =>{
            const card=document.createElement("div");
            card.innerHTML=`
               <div class="bg-white py-10 px-5 text-center shadow-sm space-y-4 rounded-[12px]">
                    <h1 class="font-bold text-2xl">${word.word ? word.word :"শব্দ পাওয়া যায়নি"}</h1>
                    <p class="font-semibold">Meaning / pronunciation</p>
                    <div class="font-medium font-bangla text-2xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
                    <div class="flex justify-between items-center">
                         <button onclick="loadWordDetail(${word.id})" class="bg-sky-100 w-10 h-10 rounded-[8px] hover:bg-sky-300"><i class="fa-solid fa-circle-info"></i></button>
                         <button class="bg-sky-100 w-10 h-10 rounded-[8px] hover:bg-sky-300"><i class="fa-solid fa-volume-low"></i></button>
                    </div>
                 </div>
            `
          wordContainer.append(card);
        });
        manageSpinner(false);
}


const displaylesson=(lessons)=>{
       const levelContainer=document.getElementById('level-container')
       levelContainer.innerHTML="";

       for (let lesson of lessons){
          console.log(lesson);
          const card=document.createElement("div")
          card.innerHTML=`
          
             <button id="lesson-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">Lesson - ${lesson.level_no}</button>
          
          `
          levelContainer.append(card)
       }
}
loadLesson();



console.log("こんにちは、mooday!");

const activityInput = document.getElementById("activityInput");
const addButton = document.getElementById("addButton");
const activityList = document.getElementById("activityList");
const completedList = document.getElementById("completedList");
const message = document.getElementById("message");



function saveActivities() {
  const activities = [];

  activityList.querySelectorAll("li").forEach(function(item) {
    activities.push({
      text: item.querySelector("span").textContent,
      completed: false
    });
  });

  completedList.querySelectorAll("li").forEach(function(item) {
    activities.push({
      text: item.querySelector("span").textContent,
      completed: true
    });
  });

  localStorage.setItem("moodayActivities", JSON.stringify(activities));
}


addButton.addEventListener("click", function() {
  if (activityInput.value.trim() === "") {
    message.textContent = "入力してね♡";
    return;
  }

  const newItem = document.createElement("li");
  const activityText = document.createElement("span");
  activityText.textContent = activityInput.value;

  const completeButton = document.createElement("button");
  completeButton.textContent = "実行した！";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";

  completeButton.addEventListener("click", function() {
    completedList.appendChild(newItem);
    completeButton.remove();
    saveActivities();
  });

  deleteButton.addEventListener("click", function() {
    newItem.remove();
    saveActivities();
  });

  newItem.appendChild(activityText);
  newItem.appendChild(completeButton);
  newItem.appendChild(deleteButton);
  activityList.appendChild(newItem);
  saveActivities();

  activityInput.value = "";
  message.textContent = "";
});


const rouletteButton = document.getElementById("rouletteButton");
const rouletteResult = document.getElementById("rouletteResult");

rouletteButton.addEventListener("click", function() {
  const activities = activityList.querySelectorAll("li");

  if (activities.length === 0) {
    rouletteResult.textContent = "まずはやることを追加してね♡";
    return;
  }

  const randomIndex = Math.floor(Math.random() * activities.length);
  const selectedActivity = activities[randomIndex];
  const activityText = selectedActivity.querySelector("span");

  rouletteResult.textContent = "今日やることは" + activityText.textContent + "!";
});

function loadActivities() {
  const savedActivities = localStorage.getItem("moodayActivities");

  if (savedActivities === null) {
    return;
  }

  const activities = JSON.parse(savedActivities);

  activities.forEach(function(activity) {
    const newItem = document.createElement("li");
    const activityText = document.createElement("span");
    activityText.textContent = activity.text;
    newItem.appendChild(activityText);

    const completeButton = document.createElement("button");
    completeButton.textContent = "実行した！";

    const returnButton = document.createElement("button");
    returnButton.textContent = "やることに戻す";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    completeButton.addEventListener("click", function() {
      completedList.appendChild(newItem);
      completeButton.style.display = "none";
      returnButton.style.display = "inline";
      saveActivities();
    });

    returnButton.addEventListener("click", function() {
      activityList.appendChild(newItem);
      returnButton.style.display = "none";
      completeButton.style.display = "inline";
      saveActivities();
    });

    deleteButton.addEventListener("click", function() {
      newItem.remove();
      saveActivities();
    });

    newItem.appendChild(completeButton);
    newItem.appendChild(returnButton);
    newItem.appendChild(deleteButton);

    if (activity.completed) {
      completedList.appendChild(newItem);
      completeButton.style.display = "none";
    } else {
      activityList.appendChild(newItem);
      returnButton.style.display = "none";
    }
  });
}

loadActivities();

// Cookieからアプリを開いた回数を取得する
const savedCount = document.cookie
  .split("; ")
  .find(row => row.startsWith("moodayCount="));

let count = savedCount ? Number(savedCount.split("=")[1]) : 0;

// 今回開いた分をカウントする
count++;

// Cookieに回数を保存する（30日間）
document.cookie = "moodayCount=" + count + "; max-age=2592000; path=/; SameSite=Lax";

// 回数に合わせて挨拶を表示する
const welcomeMessage = document.getElementById("welcomeMessage");

if (count === 1) {
  welcomeMessage.textContent = "moodayへようこそ♡";
} else if (count === 2) {
  welcomeMessage.textContent = "また来てくれてありがとう♡";
} else {
  welcomeMessage.textContent = "今日も一緒に頑張ろうね♡";
}
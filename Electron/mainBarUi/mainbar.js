
document.addEventListener('DOMContentLoaded', () => {
    
    const aiBtn = document.getElementById('ai-btn')
    aiBtn.addEventListener('click',()=>{

        window.electronAPI.ansBtn()
        window.electronAPI.getAnswer()
    })

    const settingBtn = document.getElementById('setting-btn')
    settingBtn.addEventListener('click',()=>{

        window.electronAPI.settingBtn()
    })

    const closeBtn = document.getElementById('cross-btn')
    closeBtn.addEventListener('click',()=>{
        window.electronAPI.closeBtn()
    })


});


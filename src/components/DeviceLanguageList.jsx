import { useEffect, useState } from "react"
import { langStorage } from "../helper"
import { List, ListItem } from "konsta/react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { languageState, storyState } from "../atoms"
import { useNavigate } from "react-router-dom"

function DeviceLanguageList() {
  const [langList, setLangList] = useState([])
  const navigate = useNavigate()
  const setLanguage = useSetRecoilState(languageState)
  const story = useRecoilValue(storyState)
  useEffect(() => {
    const getList = async () => {
      const _langList = []
      const keys = await langStorage.keys()
      for (const key of keys) {
        _langList.push({ code: key, name: await langStorage.getItem(key) })
      }
      setLangList(_langList)
    }
    getList()
  }, [])
  const onLanguageChange = (lang) => {
    setLanguage('user-' + lang)
    localStorage.setItem('language', 'user-' + lang)
    navigate('/user-' + lang + '/' + story)
  }
  return (
    <>
      {langList.length > 0 ? <>
        <List>
          {langList.map((lang) => {
            return (
              <ListItem
                key={lang.code}
                title={lang.name}
                onClick={() => onLanguageChange(lang.code)}
                link
              />
            )
          })}
        </List>
      </>
        : <div className="mb-12"></div>}
    </>
  )
}

export default DeviceLanguageList

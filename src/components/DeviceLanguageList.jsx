import { useEffect, useState } from "react"
import { langStorage } from "../helper"
import { List, ListItem } from "konsta/react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { directionState, languageState, storyState } from "../atoms"
import { useNavigate } from "react-router-dom"

function DeviceLanguageList() {
  const [langList, setLangList] = useState([])
  const navigate = useNavigate()
  const setLanguage = useSetRecoilState(languageState)
  const setDirection = useSetRecoilState(directionState)
  const story = useRecoilValue(storyState)
  useEffect(() => {
    const getList = async () => {
      const _langList = []
      const keys = await langStorage.keys()
      for (const key of keys) {
        const langData = await langStorage.getItem(key)
        _langList.push({ code: key, name: JSON.parse(langData).name, direction: JSON.parse(langData).direction })
      }
      setLangList(_langList)
    }
    getList()
  }, [])
  const onLanguageChange = (lang) => {
    setLanguage('user-' + lang.code)
    setDirection(lang.direction)
    navigate('/user-' + lang.code + '/' + story)
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
                onClick={() => onLanguageChange(lang)}
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

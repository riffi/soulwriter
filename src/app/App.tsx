import "./App.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppRouter} from "./providers/router";
import { DBConfig } from "../shared/db/DBconfig";
import {IndexedDB, initDB, useIndexedDB} from "react-indexed-db-hook";
import {useEffect} from "react";

const queryClient = new QueryClient()
console.log('Init DB')
initDB(DBConfig)

export const App = () => {
    const dbCharacterGroupSpace = useIndexedDB("characterGroups")
    const dbCharacterASpace = useIndexedDB("characterGroups")
    const dbCharacterAttributeDictSpace = useIndexedDB("characterAttributeDict")
    let loaded = false

    useEffect(() => {
        if (!loaded){
            dbCharacterGroupSpace.getAll().then((data) => {
                if (data.length === 0){
                    dbCharacterGroupSpace.add({title: 'Основные'})
                }
            })

            dbCharacterAttributeDictSpace.getAll().then((data) => {
                if (data.length === 0){
                    dbCharacterAttributeDictSpace.add({title: 'Рост'})
                    dbCharacterAttributeDictSpace.add({title: 'Отличительная особенность'})
                    dbCharacterAttributeDictSpace.add({title: 'Стиль одежды'})
                    dbCharacterAttributeDictSpace.add({title: 'Телосложение'})
                    dbCharacterAttributeDictSpace.add({title: 'Прическа'})
                    dbCharacterAttributeDictSpace.add({title: 'Черты лица'})
                    dbCharacterAttributeDictSpace.add({title: 'Цвет глаз'})
                    dbCharacterAttributeDictSpace.add({title: 'Этническая принадлежность'})
                    dbCharacterAttributeDictSpace.add({title: 'Возраст'})
                }
            })
        }
        return () => (loaded = true)
    })


  return (
    <QueryClientProvider client={queryClient}>
      <IndexedDB name={DBConfig.name} version={DBConfig.version} objectStoresMeta={DBConfig.objectStoresMeta}>
          <AppRouter/>
      </IndexedDB>
    </QueryClientProvider>
  )
}


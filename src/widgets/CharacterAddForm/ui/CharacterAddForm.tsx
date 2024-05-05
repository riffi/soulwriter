import {Button, Dialog, Form, Input, Selector} from "antd-mobile";
import {useCharacterAddForm} from "../model/useCharacterAddForm.ts";
import {ICharacterNewFormValues} from "../model/type.ts";

export const CharacterAddForm = () => {


    const {getInitialValues, onSubmitNewCharacter} = useCharacterAddForm()
    const onFinish = (values: ICharacterNewFormValues) => {
        onSubmitNewCharacter(values)
    }

    return  (
    <Form
        onFinish={onFinish}
        mode={'card'}
        initialValues = {getInitialValues()}
        footer={
            <Button block type='submit' color='primary' size='large'>
                Сохранить
            </Button>
        }
    >
        <Form.Header>Данные персонажа</Form.Header>

        <Form.Item
            name = {'name'}
            label = {'Имя'}
            rules={[{required: true, message: 'Обязательное поле'}]}>
            <Input placeholder='Имя нового персонажа' />
        </Form.Item>

        <Form.Item
            name = {'description'}
            label = {'Краткое описание'}
            rules={[{required: true, message: 'Обязательное поле'}]}>
            <Input placeholder='Краткое описание' />
        </Form.Item>

        <Form.Item
            name = {'sex'}
            label = {'Пол'}
            rules={[{required: true, message: 'Обязательное поле'}]}>
            <Selector
                options={[
                    {label: 'Мужской', value: 'male'},
                    {label: 'Женский', value: 'female'}
                ]}
                multiple={false}
                defaultValue={['male']}
            />
        </Form.Item>

    </Form>
    )
}

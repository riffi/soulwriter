import { Button, Form, Input, Selector} from "antd-mobile";
import {useCharacterAddForm} from "../model/useCharacterAddForm.ts";
import {ICharacterAddFormProps, ICharacterNewFormValues} from "../model/type.ts";
import {CharacterNameGenerator} from "../../../features/CharacterNameGenerator";

export const CharacterAddForm = (props: ICharacterAddFormProps) => {

    const [form] = Form.useForm();

    const {getInitialValues, onSubmitNewCharacter} = useCharacterAddForm(props.characterGroupId)
    const onFinish = (values: ICharacterNewFormValues) => {
        onSubmitNewCharacter(values)
    }

    return  (
    <Form
        onFinish={onFinish}
        mode={'card'}
        form={form}
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
        <CharacterNameGenerator onSelect={(title) => form.setFieldValue("name", title)}/>
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

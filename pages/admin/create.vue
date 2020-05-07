<template>
    <div>
        <el-dialog title="Предпросмотр" :visible.sync="previewDialog">
            <div :key="controls.text">
                <vue-markdown>{{controls.text}}</vue-markdown>
            </div>
        </el-dialog>
        <el-form 
            :model="controls" 
            :rules="rules" 
            ref="form"
            @submit.native.prevent="onSubmit"
        >

            <h1 class="mb">Создать новый пост</h1>

            <el-form-item label="Название поста" prop="title">
                <el-input  v-model="controls.title"/>
            </el-form-item>

            <el-form-item label="Текст в вормате .md или .html" prop="text">
                <el-input 
                    type="textarea"
                    v-model="controls.text" 
                    resize="none"
                    :rows="10"
                />
            </el-form-item>
            <el-button class="mb" type="success" plain @click="previewDialog = true">
                Предпросмотр
            </el-button>
            <el-upload
                class="mb"
                drag
                ref="upload"
                :on-change="handleImageChange"
                :auto-upload="false"
                action="https://jsonplaceholder.typicode.com/posts/">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Перетащите изображение <em>или нажмите</em></div>
                <div class="el-upload__tip" slot="tip">файлы с расширением jpg/png</div>
            </el-upload>
            <el-form-item>
                <el-button type="primary" round native-type="submit" :loading="loading">Создать пост</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    head: {
        title: `Создание поста | ${process.env.appName}`
    },
    layout: 'admin',
    middleware: ['admin-auth'],
    data(){
        return {
            loading: false,
            image: null,
            previewDialog: false,
            controls: {
                text: '',
                title: ''
            },
            rules: {
                text: [
                    { required: true, message: 'Текст не должен быть пустым', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: 'Заголовок не должен быть пустым', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if(valid && this.image){
                    this.loading = true;

                    const formData = {
                        text: this.controls.text,
                        title: this.controls.title,
                        image: this.image
                    }
                    try {
                       await this.$store.dispatch('post/create', formData);
                       this.controls.text = '';
                       this.controls.title = '';
                       this.image = null;
                       this.$refs.upload.clearFiles();
                       this.$message.success('Новый пост создан');
                    } catch (error) {} finally {
                        this.loading = false;
                    }
                    
                } else {
                    this.$message.warning('Форма не валидна');
                }
            });
        },
        handleImageChange(file, fileList){
            this.image = file.raw;
        }
    }
}
</script>

<style lang="scss" scoped>
    form {
        width: 600px;
    }
</style>
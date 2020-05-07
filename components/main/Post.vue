<template>
    <el-card class="post" shadow="hover" :body-style="{ padding: '0px' }">
        <header slot="header" class="post-header">
            <h3>{{ post.title }}</h3>
            <small>
                <i class="el-icon-time"></i>
                {{ post.date | date() }}
            </small>
        </header>
        <div class="post-body">
            <img 
                :src="post.imageUrl" 
                alt="Батуми" 
                class="post-img"
            >
        </div>
        <footer class="post-footer">
            <el-button round @click="openPost">Открыть</el-button>
            <span>
                <i class="el-icon-view"></i>
                {{ post.views }}
            </span>
        </footer>
    </el-card>
</template>

<script>
export default {
    props:{
        post: {
            type: Object,
            required: true
        }
    },
    methods:{
        openPost(){
            const id = this.post._id;
            this.$router.push(`/post/${id}`);
        }
    }
}
</script>

<style lang="scss" scoped>
    .post-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .post-img{
        width:100%;
        height: auto;
    }

    .post-footer{
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
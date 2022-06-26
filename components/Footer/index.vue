<template>
    <footer class="footer banner">
        <div class="container">
            <a href="https://github.com/ArickCodeGuy" target="_blank" class="git">
                <div class="git__img"><img src="/github_logo.svg" alt=""></div>
                <span class="git__text">github</span>
            </a>
        </div>
    </footer>
</template>

<script>
    
</script>

<style lang="scss">
.footer {
    .git {
        color: var(--primary-color);
        display: block;
        width: 120px;
        margin: 0 auto;
        text-align: center;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
        &__img {
            img {
                width: 60px;
            }
            margin-bottom: 1em;
        }
        &__text {
            // font-size: 2em;
            line-height: normal;
        }
    }
}
</style>
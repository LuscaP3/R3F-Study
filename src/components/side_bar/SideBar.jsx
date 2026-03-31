import styles from './sideBar.module.css'

function SideBar(){

    return(
        <div className = {styles.sideBar}>
            <section>
                <button>Explorar</button>
                <button>Controles</button>
                <button>Configurações</button>
                <button>Sair</button>
            </section>
        </div>
    );
}

export default SideBar;
import MetaManual from '../models/MetaManual.js'

const nuevaMeta = async (req, res) => {
    const meta = new MetaManual(req.body);
    
    try {
        const metaAlmacenada = await meta.save();
        res.json(metaAlmacenada);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

const obtenerMetas = async (req, res) => {
    const registros = await MetaManual.findAll();
    res.json({ registros });
}

const obtenerMeta = async (req, res) => {
    const { id } = req.params

    const meta = await MetaManual.findByPk(id);

    res.json(meta);
}

const editarMeta = async (req, res) => {
    const { id } = req.params;
    const meta = await MetaManual.findByPk(id);

    if(!meta) {
        const error = new Error('No existe la meta');
        res.status(404).json({ msg: error.message });
    }

    meta.meta = req.body.meta || meta.meta;

    try {
        const metaAlmacenada = await meta.save();
        res.json(metaAlmacenada);
    } catch (error) {
        console.log(error);
    }
}


const eliminarMeta = async (req, res) => {
    
}

export {
    nuevaMeta,
    obtenerMetas,
    obtenerMeta,
    editarMeta,
    eliminarMeta
}
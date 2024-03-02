
export default function orgSkillsModal() {
    return (
        <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-.m-1b7284a3.m-b5489c3c text-white rounded-modal" withCloseButton={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Python</h1>
            </div>
            <div className="pt-4" style={{ display: 'flex', justifyContent: 'left',  }}>
                <p style={{ fontWeight: 'bold' }}>Author</p>
                <p>:  Andrei</p>
            </div>
            <div className="pt-4" style={{ display: 'flex', justifyContent: 'left' }}>
                <p style={{ fontWeight: 'bold' }}>Description</p>
                <p>:  Python is a versatile, high-level programming language known for its simplicity and readability. Developed by Guido van Rossum and first released in 1991, Python has grown to become one of the most popular programming languages worldwide.</p>
            </div>
            <div className="pt-4"  style={{ display: 'flex', justifyContent: 'left' }}>
                <p style={{ fontWeight: 'bold' }}>Category</p>
                <p>:  programming language</p>
            </div>
            <div className="pt-4"  style={{ display: 'flex', justifyContent: 'left' }}>
                <p style={{ fontWeight: 'bold' }}>Departments</p>
                <p>:  Backend, Frontend, Databases</p>
            </div>
            <div className="pt-4"  style={{ display: 'flex', justifyContent: 'right' }}>
                <Button className="bg-accent text-white hover:bg-btn_hover font-bold rounded ">Edit skill</Button>
            </div>
        </Modal>
)
}
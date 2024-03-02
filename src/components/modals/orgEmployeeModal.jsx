import { useDisclosure } from '@mantine/hooks';

export default function orgEmployeeModal() {
    return (
        <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-.m-1b7284a3.m-b5489c3c text-white rounded-modal" withCloseButton={false} >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>BOB</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>BOB@gmail.com</p>
            </div>
            <div className="pt-4" style={{ display: 'flex', justifyContent: 'left',  }}>
                <p className="ml-[30px]" style={{fontSize: '20px', fontWeight: 'bold' }}>Roles:</p>
            </div>
            <div className="pt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Badge color="gray" size="xl" variant="filled">Organization admin</Badge>
            </div>
            <div className="pt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Badge color="gray" size="xl" variant="filled">Projects Management</Badge>
                    <Badge color="darkgrey" size="xl" variant="filled">of 25H usv</Badge>
            </div>
            <div className="pt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold rounded ">Make Department manager</Button>
            </div>
        </Modal>
    )
}
export default function Employees() {
    return (
        <div>
            <h2 className='text-xl font-bold text-black'>Cadastro de Colaboradores</h2>
            <div className='flex flex-col gap-4 mt-4 text-black'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-sm font-semibold text-black'>Nome</label>
                    <input type="text" id="name" className='border border-gray-300 rounded p-2' />  
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-sm font-semibold text-black'>Email</label>
                    <input type="email" id="email" className='border border-gray-300 rounded p-2 text-black' />
                </div>
            </div>
        </div>
    );
}
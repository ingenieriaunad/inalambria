import Modal from 'react-bootstrap/Modal';
import { Container } from 'reactstrap';
import {
  useApi,
  axios,
  faList,
  faSearch,
  FontAwesomeIcon,
  Form,
  Formik,
  Yup,
  Button,
  FloatingInput,
  Pagination,
  useEffect,
  useState,
  message
} from '../components/imports.js';


const Proveedores = (props) => {
  const [totalPages, setTotalPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [page, setPage] = useState(1);


  const [mtotalPages, setmTotalPages] = useState(0);
  const [mrecordsPerPage, setmRecordsPerPage] = useState(10);
  const [mpage, setmPage] = useState(1);
  const [totalSold, setTotalSold] = useState(0);

  const [providers, setProviders] = useState([]);
  const [detailSale, setDetailSale] = useState([]);
  const [providerDetail, setProviderDetail] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const [mySearch, setMySearch] = useState('');
  const url = useApi()
  useEffect(() => {
    axios.get(url.getProviders, 
        {
          params:{Page:page, RecordsPerPage:recordsPerPage,Search:null}
        })
          .then((res)=>{
            const totalRecords= res.data.totalRecords;
            setTotalPages(Math.ceil(totalRecords/recordsPerPage));
            setProviders(res.data.providers);
          });
    
  },[page, recordsPerPage,reloadTable]);
  async function setProvider(provider, resetForm){
    try {
      await axios.post(url.postProvider, provider)
      .then((res)=>{
        message("success",res.data.message);
        resetForm();
        setReloadTable(!reloadTable);
      });
    } catch (error) {
      console.log(error);
      message("error",error.response.data.message);
    }
  }
  async function search(){
    try {
      if(mySearch.length < 3&&mySearch!=''){
        message("warning","Debe ingresar al menos 3 caracteres para realizar la búsqueda");
        return;
      }
      await axios.get(url.getProviders, 
        {
          params:{Page:page, RecordsPerPage:recordsPerPage, Search:mySearch}
        })
          .then((res)=>{
            setPage(1);
            const totalRecords= res.data.totalRecords;
            setTotalPages(Math.ceil(totalRecords/recordsPerPage));
            setProviders(res.data.providers);
          });
    } catch (error) {
      console.log(error);
      message("error",error.response.data.message);
    }
  }

  async function getDetailSale(idProvider){
    console.log(idProvider);
    const provider = providers.find((item)=>item.idProvider===idProvider);
    if(provider==undefined){
      return;
    }
    axios.get(url.getProductsSold, 
      {
        params:{Page:mpage, RecordsPerPage:mrecordsPerPage,Search:null,IdProvider:idProvider}
      })
        .then((res)=>{
          const totalRecords= res.data.totalRecords;
          setmTotalPages(Math.ceil(totalRecords/recordsPerPage));
          setDetailSale(res.data.sales);
          console.log(provider);
          setProviderDetail(provider);
          setTotalSold(res.data.totalSold);
          setModalShow(true);
        });
  }
  return (
    <>
    <div className='row px-3'>
      <div className='col-12 text-center mb-2'>
        <h1 className='mb-n1 text-primary'><strong>Proveedores</strong></h1>
        <small className='text-info'>En esta sección se muestran los proveedores y acciones que puedes realizar</small>
      </div>
      <div className="col-xl-8">
        <div className="card border-info">
          <div className="card-header bg-info">
            <h3 className="card-title text-white">Ventas</h3>
          </div>
          <div className="card-body">
            <div className="row justify-content-end">
              <div className="col-md-12">
                <div className="input-group">
                  <div className="form-floating">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Buscar"
                      onChange={(e)=>setMySearch(e.target.value)}
                    />
                    <label>Buscar por Nombre, Identificación, Teléfono o Correo</label>
                  </div>
                  <Button
                    onClick={()=>search()}
                  ><FontAwesomeIcon icon={faSearch} /></Button>
                </div>
              </div>
            </div>
            <div className="row px-3 my-3">
              <table className="table table-striped table-hover table-bordered table-responsive border-info border-rounded" width={'100%'}>
                <thead>
                  <tr  className='text-primary text-uppercase text-center'>
                    <th>Identificación</th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.length > 0 ? (
                      providers.map((item, index)=>(
                        <tr key={index}>
                          <td>{item.identification}</td>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td className='text-center'>
                            <Button
                              id={item.idProvider}
                              tooltip={true}
                              place='top'
                              content='Ver detalle de ventas'
                              onClick={(e)=>{
                                if(e.target.tagName!=='BUTTON'){
                                  e.target = e.target.parentElement;
                                }
                                getDetailSale(e.target.id)
                              }}
                            >
                              <FontAwesomeIcon id={item.idProvider} icon={faList} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className='text-center text-info'>No hay registros</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className="row row-cols-sm-auto row-cols-xl-2 justify-content-end">
              <div className="col-xl-3 py-2 order-1">
                <select className="form-select" onChange={(e)=>{
                  setRecordsPerPage(e.target.value)
                  setPage(1)
                }}>
                      <option value="10"> Mostrar 10 registros</option>
                      <option value="25"> Mostrar 25 registros</option>
                      <option value="50"> Mostrar 50 registros</option>
                </select>
              </div>
              <div className="col py-2">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  radio={2}
                  className='justify-content-end'
                  onChangePage={(page) => setPage(page)}
                ></Pagination>
              </div>
            </div>
          </div>
          <div className="card-footer bg-info">
            
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="card border-info">
          <div className="card-header bg-info">
            <h3 className="card-title text-white">Registro de proveedor</h3>
          </div>
          <div className="card-body">
          <Formik initialValues={{ Identification:'', Name:'', Phone:'', Email:''}} 
              onSubmit={async (values,{resetForm})=>{
                 await setProvider(values,resetForm);                 
              }}
              validationSchema={Yup.object({
                  Identification:Yup.string()
                                    .required('Campo requerido'),
                  Name:Yup.string()
                            .required('Campo requerido'),
                  Phone:Yup.string()
                              .required('Campo requerido'),
                  Email:Yup.string()
                            .email('Correo inválido')
                            .required('Campo requerido'),
              })}
          >
              <Form>
                  <div className='form-group'>
                      <FloatingInput
                          type='text'
                          name='Identification'
                          placeholder="Identificación"
                          label='Identificación'
                      />
                      <FloatingInput
                          classInput='mt-2'
                          type='text'
                          name='Name'
                          placeholder="Nombre"
                          label='Nombre'
                      />
                      <FloatingInput
                          classInput='mt-2'
                          type='text'
                          name='Phone'
                          placeholder="Teléfono"
                          label='Teléfono'
                      />
                      <FloatingInput
                          classInput='mt-2'
                          type='email'
                          name='Email'
                          placeholder="name@example.com"
                          label='Correo electrónico'
                      />
                  </div>
                  <div className="d-grid gap-2 mt-3">
                      <Button type='submit'>
                          Registrar
                      </Button>
                  </div>
              </Form>
          </Formik>

          </div>
          <div className="card-footer bg-info">
            
          </div>
        </div>
      </div>          
    </div>
    {/* modal detalle de ventas */}
    <Modal size='lg' show={modalShow} onHide={(e)=>setModalShow(!modalShow)}>
      <Modal.Header closeButton>
        <Container fluid>
        <div className="row">
          <div className="col-lg-12">
            <Modal.Title>Detalle de ventas</Modal.Title>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <small><strong>Nombre:</strong> {providerDetail?.name}</small>
          </div>
          <div className="col-lg-6">
            <small><strong>Identificación:</strong> {providerDetail?.identification}</small>
          </div>
          <div className="col-lg-6">
            <small><strong>Teléfono:</strong> {providerDetail?.phone}</small>
          </div>
          <div className="col-lg-6">
            <small><strong>Total ventas:</strong> {totalSold}</small>
          </div>
        </div>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            <table className="table table-striped table-hover table-bordered table-responsive border-info border-rounded" width={'100%'}>
              <thead>
                <tr  className='text-primary text-uppercase text-center'>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Valor unitario</th>
                  <th>Valor total</th>
                </tr>
              </thead>
              <tbody>
                {detailSale.length > 0 ? (
                    detailSale.map((item, index)=>(
                      <tr key={index}>
                        <td>{item.date.split('T')[0]}</td>
                        <td>{item.product.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.product.price}</td>
                        <td>{item.quantity*item.product.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className='text-center text-info'>No hay registros</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default Proveedores
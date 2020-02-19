import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };
    
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.respInterceptors = axios.interceptors.response.use(response => response, 
                error => this.setState({error: error}) 
            );
        };

        componentWillUnmount() {           
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.respInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default withErrorHandler;
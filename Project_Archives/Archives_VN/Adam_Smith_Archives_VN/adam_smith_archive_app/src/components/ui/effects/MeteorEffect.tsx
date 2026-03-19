import React from 'react';
import styles from './MeteorEffect.module.css';

const MeteorEffect = () => {
    return (
        /* Container này đảm bảo hiệu ứng không bị tràn ra ngoài và có nền tối chuẩn */
        <div className={styles.meteorContainerFixed}>
            <div className={styles.shootingStars}>
                {/* 40 ngôi sao băng để tạo độ dày y hệt bản gốc */}
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
            </div>
        </div>
    );
};

export default MeteorEffect;

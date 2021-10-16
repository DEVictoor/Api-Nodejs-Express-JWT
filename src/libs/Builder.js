// Falta implementar el fitro para el include 

export const Builder = (body) => {

    
    const data = body.data;
    const type = body.type;
    const page = body.page;
    const url = body.URL

    const _data = createObjData(type, url, data);
    const _meta = createOBJMeta(page)
    const _link = createOBJLink(url, _meta.page);

    const output = {
        'data': _data,
        'meta': _meta,
        'links': _link,
        'jsonapi': {
            version: 'V1.0'
        }
    }

    return output;
}

const createObjData = (type, url, data) => {
    const output = []
    for (let i = 0; i < data.length; i++) {
        // console.log(typeof data[i])
        let _attr = createOBJDataAttr(data[i]);
        let obj = {
            type: type,
            id: data[i]._id,
            attr: _attr,
            links: {
                self: url + data[i]._id
            }
        }
        output.push(obj)
    }
    return output;
}

const createOBJDataAttr = (row) => {
    let object = {};

    let doc = row._doc;

    for (let [key, value] of Object.entries(doc)) {
        if(key !== '_id') 
        object[key] = value
    }

    // Object.keys(row).forEach(key => {
    //     if (key !== '_id') {
    //         console.log(key)  
    //     } 
    // })
    // console.log(doc);
    return object
}

const createOBJMeta = (page) => {
    const _pageMeta = createOBJPageMeta(page);
    const _meta = {
        author: 'Victor Mireles',
        page: _pageMeta
    }

    return _meta;
}

const createOBJPageMeta = (page) => {
    
    const num = page.num;
    const size = page.size;
    const total = page.total;
    const last = Math.ceil(total / size);

    const _page = {
        current: num,
        size: size,
        from: (num <= last) ? ((num - 1) * size) + 1 : null,
        to: (num <= last) ? num * size : null,
        total: total,
        last: last
    }

    return _page;

}

const createOBJLink = (url, page) => {
 
    const current = page.current;
    const size = page.size;
    const prev = (current !== 1) ? current - 1 : 1;
    const next = current + 1;
    const last = page.last

    const link = {
        first: url + '?page[num]=1&page[size]=' + size,
        prev: (current > 1) ? url + '?page[num]=' + prev + '&page[size]=' + size : null,
        self: url + '?page[num]=' + current + '&page[size]=' + size,
        next: (current < last) ? url + '?page[num]=' + next + '&page[size]=' + size : null,
        last: url + '?page[num]=' + last + '&page[size]=' + size
    }

    return link;
    
}
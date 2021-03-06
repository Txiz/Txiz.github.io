**初探 Java 系列第三篇**。

## **Java 虚拟机实现了自动内存管理**

对于使用 C/C++ 编写应用程序的开发者来说，需要自己管理内存，往往每一个 new 操作都需要配对地去写 delete/free 代码。但是对于 Java 开发者来说，在虚拟机自动内存管理机制的帮助下，不再需要为这一点，也就不容易出现内存泄漏和内存溢出问题。

### 运行时数据区


根据《Java 虚拟机规范》的规定，Java 虚拟机所管理的内存将会包括以下几个运行时数据区域。

<img src={require('./Image/初探Java虚拟机/Java虚拟机运行时数据区.png').default} width="500px" />

#### 程序计数器用于记录虚拟机字节码指令的地址

程序计数器（Program Counter Register）是线程私有的一小块内存区域，作用是记录虚拟机字节码指令的地址（如果是 native 本地方法的话就是 Undefined），它可以看作是当前线程所执行的字节码的行号指示器，是唯一一个在《Java 虚拟机规范》中没有规定任何 OutOfMemoryError 情况的区域。

在 Java 虚拟机的概念模型里，字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令，它是程序控制流的指示器。分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成。

:::tip **Java 虚拟机的概念模型**
Java 虚拟机的概念模型代表了所有虚拟机的统一外观，但各款具体的 Java 虚拟机并不一定要完全照着概念模型的定义来进行设计，可能会通过一些更高效率的等价方式去实现它。
:::

#### 虚拟机栈描述了 Java 方法执行的线程内存模型

与程序计数器一样，Java 虚拟机栈（Java Virtual Machine Stack）也是线程私有的，它的生命周期与线程相同。虚拟机栈描述的是 Java 方法执行的线程内存模型：每个方法被执行的时候，Java 虚拟机都会同步创建一个栈帧（Stack Frame）用于存储局部变量表、操作数栈、动态连接、方法出口等信息。每一个方法被调用直至执行完毕的过程，就对应着一个栈帧在虚拟机栈中从入栈到出栈的过程。 

在《Java 虚拟机规范》中，对这个内存区域规定了两类异常状况：① 是如果线程请求的栈深度大于虚拟机所允许的深度，将抛出 StackOverflowError 异常；② 是如果 Java 虚拟机栈容量可以动态扩展，当栈扩展时无法申请到足够的内存会抛出 OutOfMemoryError 异常。 

:::tip **虚拟机栈中局部变量表**
虚拟机栈中局部变量表存放了编译期可知的各种 Java 虚拟机基本数据类型、对象引用（reference，它并不等同于对象本身，可能是一个指向对象起始地址的引用指针，也可能是指向一个代表对象的句柄或者其他与此对象相关的位置）和 returnAddress 类型（指向了一条字节码指令的地址）。

这些数据类型在局部变量表中的存储空间以局部变量槽（Slot）来表示，其中 64 位长度的 long 和 double 类型的数据会占用两个变量槽，其余的数据类型只占用一个。局部变量表所需的内存空间在编译期间完成分配，当进入一个方法时，这个方法需要在栈帧中分配多大的局部变量空间是完全确定的，在方法运行期间不会改变局部变量表的大小。

这里说的“大小”是指变量槽的数量，虚拟机真正使用多大的内存空间（譬如按照 1 个变量槽占用 32 个比特还是 64 个比特或者更多）来实现一个变量槽，这是完全由具体的虚拟机实现自行决定的事情。
:::

:::info
可以通过 -Xss 这个虚拟机参数来指定每个线程的 Java 虚拟机栈内存大小。详情参见官方文档：[Windows 下 Oracle 的官方虚拟机参数文档](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html)，[Unix 下 Oracle 的官方虚拟机参数文档](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html)。

好多地方说 Xss 的值在 JDK1.5 以上是 1M，但是我在 Windows 的文档里面没有找到这个说法（只说默认值依赖于虚拟内存），反而在 Unix 下的文档里找到了，说其大小是依赖于平台的。

<img src={require('./Image/初探Java虚拟机/JVM虚拟机栈默认大小.jpg').default} width="100%" />
:::

#### 本地方法栈与虚拟机栈所发挥的作用非常相似

本地方法栈（Native Method Stacks）与虚拟机栈所发挥的作用是非常相似的，其区别只是虚拟机栈为虚拟机执行 Java 方法（也就是字节码）服务，而本地方法栈则是为虚拟机使用到的本地（native）方法服务。

《Java 虚拟机规范》对本地方法栈中方法使用的语言、使用方式与数据结构并没有任何强制规定，因此具体的虚拟机可以根据需要自由实现它，**甚至有的 Java 虚拟机（譬如 Hot-Spot 虚拟机）直接就把本地方法栈和虚拟机栈合二为一**。与虚拟机栈一样，本地方法栈也会在栈深度溢出或者栈扩展失败时分别抛出 StackOverflowError 和 OutOfMemoryError 异常。

#### 堆是被所有线程共享的一块内存区域

Java 堆是被所有线程共享的一块内存区域，在虚拟机启动时创建。此内存区域的唯一目的就是存放对象实例，Java 世界里几乎所有的对象实例都在这里分配内存。之所以是几乎，是因为从实现角度来看，随着 Java 语言的发展，现在已经能看到些许迹象表明日后可能出现值类型的支持，即使只考虑现在，由于即时编译技术的进步，尤其是逃逸分析技术的日渐强大，栈上分配、标量替换优化手段已经导致一些微妙的变化悄然发生，所以说 Java 对象实例都分配在堆上也渐渐变得不是那么绝对了。

:::info
Java 堆既可以被实现成固定大小的，也可以是可扩展的，不过当前主流的 Java 虚拟机都是按照可扩展来实现的（通过参数 Xmx 和 Xms 设定）。如果在 Java 堆中没有内存完成实例分配，并且堆也无法再扩展时，Java 虚拟机将会抛出 OutOfMemoryError 异常。

涉及到两个虚拟机参数 Xms、Xmx。其中 Xms 是初始化堆大小，这个值必须是 1024 的倍数，且必须大于 1MB，如果不设置这个值，大小为老年代和年轻代的和；Xmx 是最大堆大小，这个值必须是 1024 的倍数，且必须大于 2MB。

Oracle 特别强调了如果是服务器部署的情况下，Xmx 和 Xms 最好一样大。

<img src={require('./Image/初探Java虚拟机/Java堆Xms与Xmx参数.jpg').default} width="100%" />
:::